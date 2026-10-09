/* Native WebRTC transport + Supabase authorization, chat and private recording parts. */
const Live = (() => {
  const $ = id => document.getElementById(id);
  const cfg = window.VIRALHUB_LIVE || {};
  let media = null, room = null, me = null, host = false, busy = false, ending = false;
  let joinedAt = 0;
  let viewerSession = null, peers = new Map(), channels = [], timers = [], directoryTimer = null;
  let signalCursor = 0, polling = false, signalPolling = false, epoch = 0, facing = 'user';
  let recorder = null, partNo = 0, diskQueue = Promise.resolve(), uploadQueue = Promise.resolve();
  let storageDB = null, archiveRows = [], replayURL = null, replayBlob = null, replayEpoch = 0;
  let pendingHearts = 0, heartBusy = false, heartTimer = null, chatBusy = false;
  let icePreparedAt = 0;
  let profiles = new Map(), iceServers = cfg.iceServers || [], localError = null, deepLinkDone = false;
  const check = result => { if (result.error) throw new Error(result.error.message); return result.data; };
  const message = (id, text, error = false) => { const el = $(id); el.textContent = text; el.classList.toggle('error', error); };
  const safe = escapeHTML;
  const active = s => s && s.status === 'live' && Date.now() - new Date(s.heartbeat_at).getTime() < 60000;
  const duration = s => Math.max(0, Math.floor(((s.ended_at ? new Date(s.ended_at) : Date.now()) - new Date(s.started_at)) / 1000));
  const time = n => `${Math.floor(n / 60).toString().padStart(2, '0')}:${(n % 60).toString().padStart(2, '0')}`;
  async function identity() {
    const user = check(await db.auth.getUser())?.user;
    if (!user) throw new Error('Please log in to use livestreams.');
    return user;
  }
  async function names(ids) {
    const missing = [...new Set(ids)].filter(id => !profiles.has(id));
    if (missing.length) {
      const data = check(await db.from('users').select('user_id,username').in('user_id', missing));
      for (const p of data || []) profiles.set(p.user_id, p.username);
    }
    return id => '@' + (profiles.get(id) || 'creator');
  }
  function openLocalDB() {
    if (storageDB) return Promise.resolve(storageDB);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('viralhub-live-recordings-v1', 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('parts', { keyPath: 'key' });
        request.result.createObjectStore('sessions', { keyPath: 'id' });
      };
      request.onerror = () => reject(request.error);
      request.onsuccess = () => { storageDB = request.result; resolve(storageDB); };
    });
  }
  async function local(store, op, value) {
    const database = await openLocalDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(store, op === 'getAll' ? 'readonly' : 'readwrite');
      const req = value === undefined ? tx.objectStore(store)[op]() : tx.objectStore(store)[op](value);
      tx.oncomplete = () => resolve(req.result);
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('Could not save the recording on this device.'));
    });
  }
  function stopMedia() {
    if (media) media.getTracks().forEach(t => t.stop());
    media = null;
    $('livePreview').srcObject = null;
    $('previewEmpty').hidden = false;
    ['previewCamToggle', 'previewMicToggle', 'previewFlip'].forEach(id => $(id).disabled = true);
    $('enableLiveCamera').disabled = false;
  }
  async function preview() {
    if (busy || room) return;
    busy = true; $('enableLiveCamera').disabled = true;
    try {
      me = await identity();
      if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) throw new Error('Open ViralHub on HTTPS or localhost to use the camera.');
      stopMedia();
      media = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 20, max: 24 }, facingMode: { ideal: facing } }, audio: { echoCancellation: true, noiseSuppression: true } });
      if (cur !== 'create') { stopMedia(); return; }
      $('livePreview').srcObject = media; $('previewEmpty').hidden = true;
      ['previewCamToggle', 'previewMicToggle', 'previewFlip'].forEach(id => $(id).disabled = false);
      updateMediaButtons();
      message('liveSetupStatus', 'Camera ready. Add a title, then go live.');
      media.getVideoTracks()[0].onended = () => { if (!ending) message('recordingStatus', 'Camera disconnected. End the stream and reconnect your camera.', true); };
    } catch (err) {
      stopMedia();
      const text = err.name === 'NotAllowedError' ? 'Camera or microphone permission was denied. Allow both in your browser, then try again.' : err.name === 'NotFoundError' ? 'No camera or microphone was found. Connect them and try again.' : err.message;
      message('liveSetupStatus', text, true);
    } finally { busy = false; $('enableLiveCamera').disabled = false; }
  }
  function updateMediaButtons() {
    for (const kind of ['video', 'audio']) {
      const enabled = !!media?.getTracks().find(t => t.kind === kind)?.enabled;
      for (const id of kind === 'video' ? ['previewCamToggle', 'roomCamToggle'] : ['previewMicToggle', 'roomMicToggle']) {
        $(id).textContent = (kind === 'video' ? 'Camera ' : 'Mic ') + (enabled ? 'on' : 'off');
        $(id).setAttribute('aria-pressed', String(enabled));
      }
    }
  }
  function toggleMedia(kind) {
    if (!media || ending) return;
    media.getTracks().filter(t => t.kind === kind).forEach(t => t.enabled = !t.enabled);
    updateMediaButtons();
  }
  async function flipCamera() {
    if (!media || busy || ending) return;
    // Recording must keep a stable track set. Replace only the camera sender,
    // and feed the recorder through a canvas so switching doesn't stop it.
    busy = true;
    const old = media.getVideoTracks()[0], enabled = old.enabled;
    const nextFacing = facing === 'user' ? 'environment' : 'user';
    try {
      const next = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: nextFacing }, width: { ideal: 640 }, height: { ideal: 480 } }, audio: false });
      const track = next.getVideoTracks()[0]; track.enabled = enabled;
      try {
        await Promise.all([...peers.values()].map(p => p.pc.getSenders().find(s => s.track?.kind === 'video')?.replaceTrack(track)));
      } catch (err) { track.stop(); throw err; }
      media.removeTrack(old); media.addTrack(track); old.stop(); facing = nextFacing;
      $('livePreview').srcObject = media;
      if (host) { $('liveVideo').srcObject = media; captureVideo.srcObject = media; }
      updateMediaButtons();
    } catch (err) { toast('Could not switch cameras. This device may have only one camera.'); }
    finally { busy = false; }
  }
  let canvas = null, canvasTimer = null, captureVideo = null, recordedMedia = null;
  function recordingStream() {
    canvas = document.createElement('canvas'); canvas.width = 640; canvas.height = 480;
    captureVideo = document.createElement('video'); captureVideo.muted = true; captureVideo.playsInline = true; captureVideo.srcObject = media;
    captureVideo.play().catch(() => {});
    const context = canvas.getContext('2d');
    canvasTimer = setInterval(() => {
      context.fillStyle = '#08080b'; context.fillRect(0, 0, 640, 480);
      if (media?.getVideoTracks()[0]?.enabled && captureVideo.readyState >= 2) {
        const ratio = Math.min(640 / captureVideo.videoWidth, 480 / captureVideo.videoHeight);
        const w = captureVideo.videoWidth * ratio, h = captureVideo.videoHeight * ratio;
        context.drawImage(captureVideo, (640 - w) / 2, (480 - h) / 2, w, h);
      }
    }, 50);
    recordedMedia = canvas.captureStream(20);
    media.getAudioTracks().forEach(t => recordedMedia.addTrack(t));
    return recordedMedia;
  }
  async function prepareIce() {
    iceServers = cfg.iceServers || [];
    icePreparedAt = Date.now();
    if (cfg.turnFunction) {
      const data = check(await db.functions.invoke(cfg.turnFunction));
      if (!Array.isArray(data?.iceServers)) throw new Error('The network relay returned invalid settings.');
      iceServers = [...iceServers, ...data.iceServers];
    }
  }
  async function start() {
    if (busy || room || ending) return;
    const title = $('liveTitleInput').value.trim();
    if (!title) { message('liveSetupStatus', 'Give your stream a title first.', true); $('liveTitleInput').focus(); return; }
    if (!media) { await preview(); if (!media) return; }
    busy = true; $('startLiveButton').disabled = true;
    let created = null;
    try {
      me = await identity();
      if (typeof MediaRecorder === 'undefined') throw new Error('This browser cannot save livestream recordings. Use a recent Chrome, Edge, Firefox, or Safari.');
      await openLocalDB(); await prepareIce();
      const previous = check(await db.from('vh_streams').select('id,heartbeat_at').eq('owner_id', me.id).eq('status', 'live')) || [];
      if (previous.some(s => Date.now() - new Date(s.heartbeat_at).getTime() < 60000)) throw new Error('You are already live in another tab. End that stream first.');
      for (const s of previous) check(await db.from('vh_streams').update({ status: 'ended', ended_at: new Date().toISOString(), recording_state: 'interrupted' }).eq('id', s.id));
      const mime = ['video/webm;codecs=vp8,opus', 'video/webm', 'video/mp4'].find(m => MediaRecorder.isTypeSupported(m));
      if (!mime) throw new Error('Your browser has no supported recording format. Try Chrome or Edge.');
      recorder = new MediaRecorder(recordingStream(), { mimeType: mime, videoBitsPerSecond: 650000, audioBitsPerSecond: 64000 });
      created = check(await db.from('vh_streams').insert({ owner_id: me.id, title, category: document.querySelector('#cats .on')?.textContent || 'Entertainment', recording_mime: recorder.mimeType }).select().single());
      await local('sessions', 'put', { id: created.id, owner: me.id, expected: 0, complete: false });
      room = created; host = true; partNo = 0; localError = null; diskQueue = Promise.resolve(); uploadQueue = Promise.resolve();
      const stream = { ...room }; const owner = me.id;
      recorder.ondataavailable = event => {
        if (!event.data.size) return;
        const no = partNo++, part = { key: `${stream.id}:${no}`, stream: stream.id, owner, no, blob: event.data };
        diskQueue = diskQueue.then(async () => {
          await local('parts', 'put', part);
          await local('sessions', 'put', { id: stream.id, owner, expected: partNo, complete: false });
          uploadQueue = uploadQueue.then(() => uploadPart(part)).catch(err => { message('recordingStatus', 'Recording saved on this device. Cloud upload will retry when you end the stream.', true); console.warn('Recording upload deferred', err.message); });
        }).catch(err => {
          localError = err;
          message('recordingStatus', 'Recording storage is full or unavailable. End the stream now to preserve uploaded parts.', true);
          if (!ending) end();
        });
      };
      recorder.onerror = event => { localError = event.error || new Error('Recorder stopped unexpectedly'); if (!ending) end(); };
      recorder.start(5000);
      enterRoom();
      timers.push(setInterval(() => heartbeat().catch(err => message('recordingStatus', 'Connection lost. Recording continues on this device. Keep this tab open.', true)), 15000));
      await heartbeat();
      message('recordingStatus', '● Recording · Saved privately as you stream');
      message('liveSetupStatus', 'You are live.');
    } catch (err) {
      if (room && host && recorder?.state === 'recording') {
        message('recordingStatus', err.message, true); // Broadcast remains active if only the initial heartbeat failed.
      } else {
        if (created) await db.from('vh_streams').update({ status: 'ended', ended_at: new Date().toISOString(), recording_state: 'interrupted' }).eq('id', created.id);
        cleanupCapture(); room = null; host = false;
        message('liveSetupStatus', err.message, true);
      }
    } finally { busy = false; $('startLiveButton').disabled = false; }
  }
  async function uploadPart(part) {
    if (part.blob.size > 6291456) throw new Error('A recording part is too large to upload. Download it from this device.');
    const path = `${part.owner}/${part.stream}/${part.no}.part`;
    const existing = check(await db.from('vh_recording_parts').select('part_no').eq('stream_id', part.stream).eq('part_no', part.no));
    if (!existing?.length) {
      const result = await db.storage.from('live-recordings').upload(path, part.blob, { contentType: 'application/octet-stream', upsert: false });
      if (result.error && !/already exists|duplicate/i.test(result.error.message)) throw new Error(result.error.message);
      check(await db.from('vh_recording_parts').insert({ stream_id: part.stream, owner_id: part.owner, part_no: part.no, path, bytes: part.blob.size }));
    }
    await local('parts', 'delete', part.key);
  }
  function cleanupCapture() {
    clearInterval(canvasTimer); canvasTimer = null;
    if (recordedMedia) recordedMedia.getVideoTracks().forEach(t => t.stop());
    if (captureVideo) { captureVideo.pause(); captureVideo.srcObject = null; }
    recordedMedia = null; captureVideo = null; canvas = null;
  }
  function enterRoom() {
    epoch++; joinedAt = Date.now(); signalCursor = 0; signalPolling = false; polling = false; pendingHearts = 0;
    $('liveRoomTitle').textContent = room.title; $('liveCategory').textContent = room.category;
    $('liveVideo').muted = host; $('liveVideo').srcObject = host ? media : null;
    $('hostLiveControls').hidden = !host; $('liveChat').replaceChildren(); $('liveChat').dataset.signature = '__new__';
    $('liveLikeCount').dataset.total = '0'; $('liveLikeCount').textContent = '0';
    $('livePlay').hidden = true; $('liveReconnect').hidden = true; $('liveBadge').textContent = 'LIVE';
    $('liveCommentInput').disabled = false; $('liveSendComment').disabled = false; $('liveHeartButton').disabled = false;
    $('endLiveButton').disabled = false; $('mutedLiveList').hidden = true;
    $('returnToLive').hidden = true;
    message('recordingStatus', host ? '● Recording · Saved privately as you stream' : '');
    message('liveConnection', host ? '' : 'Connecting to the live camera…');
    go('liveRoom');
    const thisEpoch = epoch;
    names([room.owner_id]).then(handle => { if (epoch === thisEpoch) $('liveHostHandle').textContent = handle(room.owner_id); }).catch(() => {});
    const trigger = () => poll().catch(err => message('liveConnection', 'Connection interrupted. Retrying…'));
    channels.push(db.channel('vh-room-' + room.id + '-' + crypto.randomUUID())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vh_streams', filter: 'id=eq.' + room.id }, trigger)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vh_live_comments', filter: 'stream_id=eq.' + room.id }, trigger)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vh_live_likes', filter: 'stream_id=eq.' + room.id }, trigger)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vh_live_signals', filter: 'recipient_id=eq.' + me.id }, () => pollSignals().catch(() => {}))
      .subscribe());
    timers.push(setInterval(trigger, 3000));
    timers.push(setInterval(() => pollSignals().catch(() => {}), 1200));
    timers.push(setInterval(() => { if (room) $('liveTimer').textContent = time(duration(room)); }, 1000));
    trigger();
  }
  async function heartbeat() {
    if (!room || !me || ending) return;
    if (cfg.turnFunction && Date.now() - icePreparedAt > 900000) await prepareIce();
    if (host) check(await db.from('vh_streams').update({ heartbeat_at: new Date().toISOString(), viewer_count: [...peers.values()].filter(p => p.pc.connectionState === 'connected').length }).eq('id', room.id));
    else if (viewerSession) check(await db.from('vh_live_viewers').update({ heartbeat_at: new Date().toISOString() }).eq('session_id', viewerSession));
  }
  async function join(id) {
    if (busy || ending) return;
    if (host && room) { go('liveRoom'); return; }
    busy = true;
    try {
      await leaveViewer(); stopMedia(); me = await identity(); await prepareIce();
      const stream = check(await db.from('vh_streams').select('*').eq('id', id).maybeSingle());
      if (!active(stream)) throw new Error('This livestream has ended.');
      if (stream.owner_id === me.id) throw new Error('Your stream is running in another tab. Watch it using a different account.');
      const session = crypto.randomUUID();
      check(await db.from('vh_live_viewers').insert({ session_id: session, stream_id: id, user_id: me.id }));
      room = stream; host = false; viewerSession = session; enterRoom();
      timers.push(setInterval(() => heartbeat().catch(() => {}), 15000));
      await heartbeat();
    } catch (err) { toast(err.message); await leaveViewer(); go('home'); }
    finally { busy = false; }
  }
  async function sendSignal(session, recipient, kind, payload) {
    if (!room || ending) return;
    check(await db.from('vh_live_signals').insert({ stream_id: room.id, viewer_session: session, sender_id: me.id, recipient_id: recipient, kind, payload }));
  }
  function newPeer(session, user) {
    const p = { pc: new RTCPeerConnection({ iceServers }), user, queue: [], serial: Promise.resolve() };
    peers.set(session, p);
    const thisEpoch = epoch;
    p.pc.onicecandidate = event => { if (event.candidate && epoch === thisEpoch) sendSignal(session, user, 'ice', event.candidate.toJSON()).catch(err => console.warn('ICE delivery failed', err.message)); };
    p.pc.ontrack = event => {
      if (!host && epoch === thisEpoch) {
        $('liveVideo').srcObject = event.streams[0] || new MediaStream([event.track]);
        playVideo();
      }
    };
    p.pc.onconnectionstatechange = () => {
      if (epoch !== thisEpoch) return;
      if (!host) {
        const state = p.pc.connectionState;
        if (state === 'connected') { message('liveConnection', ''); $('liveReconnect').hidden = true; }
        if (state === 'failed' || state === 'disconnected') { message('liveConnection', 'Camera connection lost. Tap Reconnect to try again.'); $('liveReconnect').hidden = false; }
      }
    };
    if (host) media.getTracks().forEach(track => p.pc.addTrack(track, media));
    return p;
  }
  async function acceptViewers() {
    const stream = room.id, thisEpoch = epoch;
    const rows = check(await db.from('vh_live_viewers').select('*').eq('stream_id', stream).order('heartbeat_at', { ascending: true })) || [];
    if (!host || epoch !== thisEpoch) return;
    for (const [session, p] of peers) {
      if (!rows.some(v => v.session_id === session && Date.now() - new Date(v.heartbeat_at).getTime() < 45000)) { p.pc.close(); peers.delete(session); }
    }
    for (const viewer of rows) {
      if (Date.now() - new Date(viewer.heartbeat_at).getTime() >= 45000) { await db.from('vh_live_viewers').delete().eq('session_id', viewer.session_id); continue; }
      if (peers.has(viewer.session_id)) continue;
      if (peers.size >= Math.min(8, cfg.maxViewers || 8)) continue;
      const p = newPeer(viewer.session_id, viewer.user_id);
      try {
        await p.pc.setLocalDescription(await p.pc.createOffer());
        await sendSignal(viewer.session_id, viewer.user_id, 'offer', p.pc.localDescription.toJSON());
      } catch (err) { p.pc.close(); peers.delete(viewer.session_id); }
    }
  }
  async function pollSignals() {
    if (!room || signalPolling || ending) return;
    signalPolling = true; const thisEpoch = epoch;
    try {
      let query = db.from('vh_live_signals').select('*').eq('stream_id', room.id).eq('recipient_id', me.id).gt('id', signalCursor).order('id').limit(200);
      if (!host) query = query.eq('viewer_session', viewerSession);
      const signals = check(await query) || [];
      if (epoch !== thisEpoch) return;
      for (const s of signals) {
        signalCursor = Math.max(signalCursor, s.id);
        let p = peers.get(s.viewer_session);
        if (!p && !host) p = newPeer(s.viewer_session, room.owner_id);
        if (!p) continue;
        if (s.kind === 'ice') {
          if (!p.pc.remoteDescription) p.queue.push(s.payload);
          else await p.pc.addIceCandidate(s.payload).catch(() => {});
        } else {
          await p.pc.setRemoteDescription(s.payload);
          for (const candidate of p.queue.splice(0)) await p.pc.addIceCandidate(candidate).catch(() => {});
          if (s.kind === 'offer' && !host) {
            await p.pc.setLocalDescription(await p.pc.createAnswer());
            await sendSignal(viewerSession, room.owner_id, 'answer', p.pc.localDescription.toJSON());
          }
        }
      }
    } finally { if (epoch === thisEpoch) signalPolling = false; }
  }
  async function poll() {
    if (!room || polling || ending) return;
    polling = true; const thisEpoch = epoch, id = room.id;
    try {
      const data = check(await db.from('vh_streams').select('*').eq('id', id).maybeSingle());
      if (epoch !== thisEpoch) return;
      if (!active(data) && !host) {
        room = data || { ...room, status: 'ended' };
        $('liveBadge').textContent = 'ENDED';
        message('liveConnection', 'This livestream has ended. Thanks for watching!');
        $('liveCommentInput').disabled = true; $('liveSendComment').disabled = true; $('liveHeartButton').disabled = true;
        stopConnections(); return;
      }
      if (data) room = data;
      if (host) {
        await acceptViewers();
        const connected = [...peers.values()].filter(p => p.pc.connectionState === 'connected').length;
        if (room.viewer_count !== connected) {
          check(await db.from('vh_streams').update({ viewer_count: connected }).eq('id', id));
          room.viewer_count = connected;
        }
      }
      const [commentsResult, likesResult, banResult] = await Promise.all([
        db.from('vh_live_comments').select('*').eq('stream_id', id).order('id', { ascending: false }).limit(100),
        db.from('vh_live_likes').select('total').eq('stream_id', id),
        db.from('vh_live_bans').select('user_id').eq('stream_id', id).eq('user_id', me.id)
      ]);
      const comments = check(commentsResult) || [], likes = check(likesResult) || [], banned = (check(banResult) || []).length > 0;
      const handle = await names(comments.map(c => c.user_id));
      if (epoch !== thisEpoch) return;
      const chat = $('liveChat'), nearBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight < 60;
      const signature = comments.map(c => c.id).join(',');
      if (chat.dataset.signature !== signature) {
        chat.dataset.signature = signature; chat.replaceChildren();
        for (const c of comments.reverse()) {
          const row = document.createElement('p'), name = document.createElement('b'); name.textContent = handle(c.user_id);
          row.append(name, document.createTextNode(c.body));
          if (host || c.user_id === me.id) {
            const del = document.createElement('button'); del.className = 'vl-mod'; del.textContent = 'Remove'; del.onclick = () => removeComment(c.id); row.append(del);
          }
          if (host && c.user_id !== me.id) {
            const mute = document.createElement('button'); mute.className = 'vl-mod'; mute.textContent = 'Mute chat'; mute.onclick = () => muteUser(c.user_id); row.append(mute);
          }
          chat.append(row);
        }
        if (!comments.length) { const p = document.createElement('p'); p.textContent = 'Be the first to say hello.'; chat.append(p); }
        if (nearBottom) chat.scrollTop = chat.scrollHeight;
      }
      const total = likes.reduce((n, l) => n + Number(l.total), 0), previous = Number($('liveLikeCount').dataset.total || 0);
      if (total > previous && previous) animateHeart();
      $('liveLikeCount').textContent = nf(total); $('liveLikeCount').dataset.total = total;
      $('liveViewerCount').textContent = `${room.viewer_count} viewer${room.viewer_count === 1 ? '' : 's'}`;
      if (!host) {
        $('liveCommentInput').disabled = banned; $('liveSendComment').disabled = banned || chatBusy; $('liveHeartButton').disabled = banned;
        message('recordingStatus', banned ? 'The host has muted your chat and reactions for this stream.' : '');
      }
      if (!host && Date.now() - joinedAt > 20000 && ![...peers.values()].some(p => p.pc.connectionState === 'connected')) { message('liveConnection', 'Video has not connected. The stream may be full or this network may block video. Try Reconnect.'); $('liveReconnect').hidden = false; }
    } finally { if (epoch === thisEpoch) polling = false; }
  }
  function animateHeart() {
    if ($('liveHearts').childElementCount > 20) return;
    const el = document.createElement('span'); el.className = 'vl-heart'; el.textContent = '♥'; el.style.setProperty('--drift', Math.floor(Math.random() * 100 - 50) + 'px'); $('liveHearts').append(el); setTimeout(() => el.remove(), 1400);
  }
  function heart() {
    if (!room || ending || $('liveHeartButton').disabled) return;
    animateHeart(); pendingHearts = Math.min(pendingHearts + 1, 500);
    if (!heartTimer) heartTimer = setTimeout(() => { heartTimer = null; flushHearts(); }, 500);
  }
  async function flushHearts() {
    if (!pendingHearts || heartBusy || !room || ending) return;
    heartBusy = true; const id = room.id, count = Math.min(50, pendingHearts); pendingHearts -= count;
    try { check(await db.rpc('vh_add_hearts', { p_stream: id, p_count: count })); await poll(); }
    catch (err) { toast('Hearts could not be sent. Try again.'); }
    finally { heartBusy = false; if (pendingHearts && room?.id === id && !ending) heartTimer = setTimeout(() => { heartTimer = null; flushHearts(); }, 500); }
  }
  async function comment() {
    if (chatBusy || !room || ending || $('liveSendComment').disabled) return;
    const text = $('liveCommentInput').value.trim(); if (!text) return;
    chatBusy = true; $('liveSendComment').disabled = true;
    try { check(await db.from('vh_live_comments').insert({ stream_id: room.id, user_id: me.id, body: text })); $('liveCommentInput').value = ''; await poll(); }
    catch (err) { toast('Comment could not be sent. The stream may have ended or chat may be muted.'); }
    finally { chatBusy = false; if (room?.status === 'live') $('liveSendComment').disabled = $('liveCommentInput').disabled; }
  }
  async function removeComment(id) { try { check(await db.from('vh_live_comments').delete().eq('id', id)); await poll(); } catch (err) { toast('Could not remove this comment.'); } }
  async function muteUser(user) { try { check(await db.from('vh_live_bans').upsert({ stream_id: room.id, user_id: user }, { ignoreDuplicates: true })); toast('This viewer’s chat and reactions are muted.'); } catch (err) { toast(err.message); } }
  async function showMuted() {
    if (!host || !room) return;
    const box = $('mutedLiveList'); box.hidden = !box.hidden;
    if (box.hidden) return;
    try {
      const rows = check(await db.from('vh_live_bans').select('user_id').eq('stream_id', room.id)) || [];
      const handle = await names(rows.map(r => r.user_id)); box.replaceChildren();
      if (!rows.length) box.textContent = 'No viewers are muted.';
      for (const r of rows) {
        const button = document.createElement('button'); button.textContent = 'Unmute ' + handle(r.user_id);
        button.onclick = async () => {
          try { check(await db.from('vh_live_bans').delete().eq('stream_id', room.id).eq('user_id', r.user_id)); button.remove(); }
          catch (err) { toast(err.message); }
        };
        box.append(button);
      }
    } catch (err) { toast(err.message); }
  }
  function stopConnections() {
    timers.forEach(clearInterval); timers = []; channels.forEach(c => db.removeChannel(c)); channels = [];
    peers.forEach(p => p.pc.close()); peers.clear(); clearTimeout(heartTimer); heartTimer = null; pendingHearts = 0;
  }
  async function leaveViewer() {
    if (host) return;
    const session = viewerSession; viewerSession = null; epoch++; stopConnections();
    room = null; $('liveVideo').pause(); $('liveVideo').srcObject = null;
    if (session) await db.from('vh_live_viewers').delete().eq('session_id', session);
  }
  async function leave() {
    if (ending) return;
    if (host) { go('home'); showDirectory(true); return; }
    await leaveViewer(); go('home'); showDirectory(true);
  }
  async function playVideo() {
    try { await $('liveVideo').play(); $('livePlay').hidden = true; }
    catch (err) { $('livePlay').hidden = false; }
  }
  async function reconnect() { if (!host && room && !busy) await join(room.id); }
  async function share() {
    if (!room) return;
    const url = new URL(location.href); url.search = ''; url.searchParams.set('live', room.id); url.hash = '';
    try { if (navigator.share) await navigator.share({ title: room.title, url: url.href }); else { await navigator.clipboard.writeText(url.href); toast('Live link copied'); } }
    catch (err) { if (err.name !== 'AbortError') toast('Could not share. Copy the page URL and add ?live=' + room.id); }
  }
  async function end() {
    if (!host || !room || ending) return;
    ending = true; $('endLiveButton').disabled = true; const finished = { ...room }, owner = me.id;
    message('recordingStatus', 'Ending your stream and saving the recording…');
    let stopped = false;
    try {
      await new Promise(resolve => {
        if (!recorder || recorder.state === 'inactive') return resolve();
        recorder.addEventListener('stop', resolve, { once: true }); recorder.stop();
      });
      stopped = true; stopConnections(); cleanupCapture(); stopMedia(); $('liveVideo').srcObject = null;
      await diskQueue;
      await local('sessions', 'put', { id: finished.id, owner, expected: partNo, complete: !localError });
      check(await db.from('vh_streams').update({ status: 'ended', ended_at: new Date().toISOString(), recording_state: localError ? 'interrupted' : 'uploading', part_count: partNo, viewer_count: 0 }).eq('id', finished.id));
      await uploadQueue;
      await recover(finished.id, false);
      toast(localError ? 'Stream ended. Available recording parts were preserved.' : 'Stream ended. Recording saved.');
    } catch (err) { toast('Stream stopped. Open Past Livestreams to retry saving your recording.'); console.warn('Stream finalization deferred', err.message); }
    finally {
      if (!stopped) { stopConnections(); cleanupCapture(); stopMedia(); }
      epoch++; host = false; room = null; recorder = null; ending = false; $('returnToLive').hidden = true;
      openArchive();
    }
  }
  async function recover(id, reload = true) {
    const user = await identity(), parts = (await local('parts', 'getAll')).filter(p => p.stream === id && p.owner === user.id).sort((a, b) => a.no - b.no);
    for (const p of parts) await uploadPart(p);
    const row = check(await db.from('vh_streams').select('*').eq('id', id).eq('owner_id', user.id).single());
    if (active(row)) throw new Error('This stream is still live. Return to the broadcasting tab to end it.');
    const session = (await local('sessions', 'getAll')).find(s => s.id === id && s.owner === user.id);
    const cloud = check(await db.from('vh_recording_parts').select('part_no').eq('stream_id', id).order('part_no')) || [];
    const expected = session?.expected || row.part_count;
    const contiguous = cloud.length > 0 && cloud.every((p, i) => p.part_no === i);
    const complete = contiguous && cloud.length === expected && (session ? session.complete : row.recording_state === 'uploading' || row.recording_state === 'ready');
    check(await db.from('vh_streams').update({ status: 'ended', ended_at: row.ended_at || new Date().toISOString(), recording_state: complete ? 'ready' : 'interrupted', part_count: expected || cloud.length, viewer_count: 0 }).eq('id', id));
    if (complete) await local('sessions', 'delete', id);
    if (reload) { toast(complete ? 'Recording saved.' : 'Available parts recovered. This recording may be incomplete.'); await loadArchive(); }
  }
  async function openArchive() { go('pastLivestreams'); await loadArchive(); }
  async function loadArchive() {
    const list = $('pastLiveList'); list.innerHTML = '<p class="vl-message">Loading your recordings…</p>';
    try {
      const user = await identity();
      archiveRows = check(await db.from('vh_streams').select('*').eq('owner_id', user.id).order('started_at', { ascending: false }).limit(100)) || [];
      let localParts = [];
      try { localParts = (await local('parts', 'getAll')).filter(p => p.owner === user.id); } catch (err) { /* Cloud archive remains usable without local storage. */ }
      list.replaceChildren();
      for (const s of archiveRows) {
        const card = document.createElement('article'); card.className = 'vl-archive-card';
        const title = document.createElement('h3'); title.textContent = s.title;
        const details = document.createElement('p'); details.textContent = `${new Date(s.started_at).toLocaleString()} · ${time(duration(s))} · ${s.category}`;
        const status = document.createElement('p');
        status.textContent = active(s) ? 'Currently live' : s.recording_state === 'ready' ? 'Saved privately · Ready to replay' : s.recording_state === 'interrupted' ? 'Interrupted stream · Recording may be incomplete' : 'Recording needs upload recovery';
        const actions = document.createElement('div'); actions.className = 'vl-actions';
        function button(text, handler, primary = false) { const b = document.createElement('button'); b.textContent = text; if (primary) b.className = 'vl-primary'; b.onclick = async () => { b.disabled = true; try { await handler(); } catch (err) { toast(err.message); } finally { b.disabled = false; } }; actions.append(b); }
        if (host && room?.id === s.id) button('Return to live', () => go('liveRoom'), true);
        else if (!active(s)) {
          if (s.part_count || s.recording_state === 'ready') button(s.recording_state === 'ready' ? 'Watch replay' : 'Play saved parts', () => replay(s), true);
          if (s.recording_state !== 'ready' || localParts.some(p => p.stream === s.id)) button('Recover recording', () => recover(s.id));
          if (localParts.some(p => p.stream === s.id)) button('Download from device', () => downloadLocal(s));
        }
        card.append(title, details, status, actions); list.append(card);
      }
      if (!archiveRows.length) list.innerHTML = '<div class="vl-archive-card"><h3>No livestreams yet</h3><p>Your recordings will appear here after your first stream.</p><button class="cta" onclick="go(\'create\');setSeg(1)">Start your first live</button></div>';
    } catch (err) { list.innerHTML = `<p class="vl-message error">${safe(err.message)}</p><button class="cta" onclick="Live.loadArchive()">Try again</button>`; }
  }
  async function getRecording(s, useLocal = false, progress = () => {}) {
    const cloud = check(await db.from('vh_recording_parts').select('*').eq('stream_id', s.id).order('part_no')) || [];
    let pending = [];
    if (useLocal) { const user = await identity(); pending = (await local('parts', 'getAll')).filter(p => p.stream === s.id && p.owner === user.id); }
    const map = new Map(cloud.map(p => [p.part_no, p]));
    for (const p of pending) if (!map.has(p.no)) map.set(p.no, { part_no: p.no, blob: p.blob });
    const ordered = [...map.values()].sort((a, b) => a.part_no - b.part_no);
    if (!ordered.length) throw new Error('No recording parts have been saved yet. Try Recover recording first.');
    // A missing part breaks the WebM container. Never present a corrupt file as a replay.
    if (!ordered.every((p, i) => p.part_no === i)) throw new Error('Some recording parts are missing. Use Recover recording on the original device.');
    const blobs = [];
    for (let i = 0; i < ordered.length; i += 4) {
      const batch = await Promise.all(ordered.slice(i, i + 4).map(p => p.blob ? p.blob : db.storage.from('live-recordings').download(p.path).then(check)));
      blobs.push(...batch); progress(Math.min(i + 4, ordered.length), ordered.length);
    }
    return new Blob(blobs, { type: s.recording_mime });
  }
  async function replay(s) {
    if (replayURL) URL.revokeObjectURL(replayURL); replayURL = null; replayBlob = null;
    const token = ++replayEpoch; go('liveReplay'); $('replayTitle').textContent = s.title; $('replayVideo').removeAttribute('src'); $('downloadReplay').hidden = true;
    message('replayStatus', 'Loading recording…');
    try {
      const blob = await getRecording(s, false, (n, total) => { if (token === replayEpoch) message('replayStatus', `Loading recording · ${Math.round(n / total * 100)}%`); });
      if (token !== replayEpoch) return;
      replayBlob = blob; replayURL = URL.createObjectURL(blob); $('replayVideo').src = replayURL; $('downloadReplay').hidden = false;
      message('replayStatus', s.recording_state === 'ready' ? 'Private recording · Only you can view this replay.' : 'Partial recording · The stream was interrupted or some uploads remain.');
    } catch (err) { if (token === replayEpoch) message('replayStatus', err.message, true); }
  }
  function saveBlob(blob, title) {
    const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = title.replace(/[^a-z0-9_-]/gi, '_').slice(0, 70) + (blob.type.includes('mp4') ? '.mp4' : '.webm'); a.click(); setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  function downloadReplay() { if (replayBlob) saveBlob(replayBlob, $('replayTitle').textContent); }
  async function downloadLocal(s) { toast('Preparing recording…'); saveBlob(await getRecording(s, true), s.title); }
  function closeReplay() { replayEpoch++; $('replayVideo').pause(); $('replayVideo').removeAttribute('src'); if (replayURL) URL.revokeObjectURL(replayURL); replayURL = null; replayBlob = null; openArchive(); }
  async function loadDirectory() {
    try {
      const rows = check(await db.from('vh_streams').select('*').eq('status', 'live').gt('heartbeat_at', new Date(Date.now() - 60000).toISOString()).order('started_at', { ascending: false }).limit(50)) || [];
      const handle = await names(rows.map(s => s.owner_id)); const box = $('liveDirectory');
      if (box.hidden) return;
      box.innerHTML = '<div class="vl-directory-head"><h2>Live now</h2><button onclick="go(\'create\');setSeg(1)">Go live</button></div>';
      if (!rows.length) box.insertAdjacentHTML('beforeend', '<article class="vl-archive-card"><h3>Nobody is live right now</h3><p>Start a stream and make the first hello.</p></article>');
      for (const s of rows) {
        const b = document.createElement('button'); b.className = 'vl-live-card';
        b.innerHTML = `<span class="vl-badge">LIVE</span><div><b>${safe(s.title)}</b><small>${safe(handle(s.owner_id))} · ${safe(s.category)} · ${s.viewer_count} watching</small></div><span>›</span>`;
        b.onclick = () => host && room?.id === s.id ? go('liveRoom') : join(s.id); box.append(b);
      }
    } catch (err) { if (!$('liveDirectory').hidden) $('liveDirectory').innerHTML = '<p class="vl-message">Could not load livestreams.</p><button class="cta" onclick="Live.loadDirectory()">Try again</button>'; }
  }
  function showDirectory(show) {
    $('liveDirectory').hidden = !show; $('emptyLive').classList.remove('show');
    if (show) {
      stopFeedPlayback();
      document.querySelectorAll('#feedtabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === 'live'));
      $('feed').style.display = 'none'; $('emptyFriends').classList.remove('show');
      layoutInk();
    }
    clearInterval(directoryTimer); directoryTimer = null;
    if (show) { loadDirectory(); directoryTimer = setInterval(loadDirectory, 10000); }
  }
  function onNavigate(next, previous) {
    $('returnToLive').hidden = !host || ending || next === 'liveRoom';
    if (previous === 'create' && !host && !busy) stopMedia();
    if (previous === 'liveRoom' && !host && !busy) leaveViewer();
    if (previous === 'liveReplay') { replayEpoch++; $('replayVideo').pause(); if (replayURL) URL.revokeObjectURL(replayURL); replayURL = null; replayBlob = null; }
    if (next !== 'home') { clearInterval(directoryTimer); directoryTimer = null; }
    else if (document.querySelector('#feedtabs button.on')?.dataset.tab === 'live') showDirectory(true);
    if (next === 'home' && !deepLinkDone) {
      const id = new URL(location.href).searchParams.get('live'); deepLinkDone = true;
      if (id && /^[0-9a-f-]{36}$/i.test(id)) setTimeout(() => join(id), 0);
    }
  }
  async function beforeLogout() {
    if (ending || busy) { toast('Please wait for the current live action to finish.'); return false; }
    if (host) await end(); else await leaveViewer(); stopMedia(); return true;
  }
  function signedOut() {
    epoch++; stopConnections(); cleanupCapture(); stopMedia(); room = null; host = false; me = null; viewerSession = null; profiles.clear();
    if (recorder && recorder.state !== 'inactive') recorder.stop(); recorder = null;
    $('returnToLive').hidden = true; $('pastLiveList').replaceChildren(); $('liveChat').replaceChildren(); clearInterval(directoryTimer);
    replayEpoch++; $('replayVideo').pause(); $('replayVideo').removeAttribute('src'); if (replayURL) URL.revokeObjectURL(replayURL); replayURL = null; replayBlob = null;
  }
  window.addEventListener('beforeunload', event => { if (host || ending || recorder?.state === 'recording') { event.preventDefault(); event.returnValue = ''; } });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && room) { heartbeat().catch(() => {}); poll().catch(() => {}); } });
  $('liveVideo').addEventListener('error', () => message('liveConnection', 'The camera video could not be played. Try reconnecting.'));
  $('replayVideo').addEventListener('error', () => message('replayStatus', 'This recording could not be played. Download it to try a compatible video player.', true));
  return { preview, start, toggleMedia, flipCamera, join, leave, end, heart, comment, share, reconnect, playVideo, showMuted, openArchive, loadArchive, loadDirectory, showDirectory, closeReplay, downloadReplay, onNavigate, beforeLogout, signedOut };
})();
