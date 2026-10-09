/* Comment threads and original sounds. Existing media and legacy tables stay intact. */
const Social = (() => {
  const $=id=>document.getElementById(id);
  let replyTarget=null, threadRows=[], replyRows=[], commentEpoch=0, sending=false;
  let currentSound=null, soundEpoch=0, chosenSound=null, saved=false, saving=false;
  const labels=new Map();
  let processCancel=null;
  const check=r=>{if(r.error)throw new Error(r.error.message);return r.data;};
  const safe=value=>escapeHTML(value ?? '');
  function commentTime(timestamp, legacyDate, now=Date.now()) {
    if(!timestamp) return legacyDate ? new Date(legacyDate+'T00:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}) : '';
    const time=new Date(timestamp).getTime(); if(!Number.isFinite(time))return '';
    const seconds=Math.max(0,Math.floor((now-time)/1000));
    if(seconds<60)return 'Just now';
    if(seconds<3600)return Math.floor(seconds/60)+'m ago';
    if(seconds<86400)return Math.floor(seconds/3600)+'h ago';
    if(seconds<604800)return Math.floor(seconds/86400)+'d ago';
    return new Date(time).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
  }
  function selectVideo(videoId) {
    commentEpoch++; currentCommentVideoId=videoId; replyTarget=null;
    threadRows=[];replyRows=[]; $('cmtInput').value='';cancelReply();
  }
  function cancelReply() { replyTarget=null;$('replyContext').hidden=true;$('cmtInput').placeholder='Add a comment'; }
  function reply(commentId,replyId=null) {
    const root=threadRows.find(c=>c.comment_id===commentId);
    const target=replyId?replyRows.find(r=>r.id===replyId&&r.comment_id===commentId):root;
    if(!root||!target)return;
    replyTarget={commentId,replyId,username:target.username||'user'};
    $('replyContext').hidden=false;$('replyContext').querySelector('span').textContent='Replying to @'+replyTarget.username;
    $('cmtInput').placeholder='Write your reply';$('cmtInput').focus();
  }
  async function updateCount(videoId) {
    const [root,replies]=await Promise.all([
      db.from('comment').select('*',{count:'exact',head:true}).eq('video_id',videoId),
      db.from('vh_comment_replies').select('*',{count:'exact',head:true}).eq('video_id',videoId)
    ]);
    if(root.error||replies.error)return;
    const card=document.querySelector(`#feed [data-video-id="${videoId}"]`);
    const el=card?.querySelector('[data-comments]');if(el)el.textContent=nf((root.count||0)+(replies.count||0));
  }
  function commentMarkup(row,rootId,isReply=false) {
    const target=isReply&&row.reply_to_id?replyRows.find(r=>r.id===row.reply_to_id):null;
    const stamp=commentTime(row.created_at,row['date-commented']);
    return `<div class="thread-comment ${isReply?'thread-reply':''}"><div class="comment-avatar" aria-hidden="true">${safe((row.username||'?').slice(0,1).toUpperCase())}</div><div class="comment-body"><b>@${safe(row.username||'user')}</b><p>${target?'<span class="reply-mention">@'+safe(target.username)+' </span>':''}${safe(isReply?row.body:row.comment_text)}</p><div class="comment-footer"><time title="${safe(row.created_at||row['date-commented'])}" data-timestamp="${safe(row.created_at||'')}" data-legacy-date="${safe(row['date-commented']||'')}">${safe(stamp)}</time><button onclick="Social.reply('${rootId}'${isReply?",'"+row.id+"'":''})">Reply</button></div></div></div>`;
  }
  async function loadComments(videoId) {
    const token=++commentEpoch;$('cmtList').innerHTML='<p class="comment-empty">Loading comments…</p>';
    try {
      const [roots,replies]=await Promise.all([
        db.from('comment').select('comment_id,video_id,username,comment_text,created_at,date-commented').eq('video_id',videoId).order('date-commented',{ascending:true}).order('created_at',{ascending:true}),
        db.from('vh_comment_replies').select('id,comment_id,user_id,reply_to_id,body,created_at').eq('video_id',videoId).order('created_at',{ascending:true})
      ]);
      const rootData=check(roots)||[],replyData=check(replies)||[];
      const ids=[...new Set(replyData.map(r=>r.user_id))];
      const profiles=ids.length?check(await db.from('users').select('user_id,username').in('user_id',ids))||[]:[];
      if(token!==commentEpoch||currentCommentVideoId!==videoId)return;
      threadRows=rootData;replyRows=replyData.map(r=>({...r,username:profiles.find(p=>p.user_id===r.user_id)?.username||'user'}));
      const total=threadRows.length+replyRows.length;$('cmtCount').textContent=total+' '+(total===1?'comment':'comments');
      $('cmtList').innerHTML=threadRows.length?threadRows.map(root=>{
        const children=replyRows.filter(r=>r.comment_id===root.comment_id);
        return `<article class="comment-thread" data-comment-id="${root.comment_id}">${commentMarkup(root,root.comment_id)}${children.length?'<details class="comment-replies"><summary>View '+children.length+' '+(children.length===1?'reply':'replies')+'</summary>'+children.map(r=>commentMarkup(r,root.comment_id,true)).join('')+'</details>':''}</article>`;
      }).join(''):'<p class="comment-empty">No comments yet.<br>Start the conversation.</p>';
    }catch(err){if(token===commentEpoch)$('cmtList').innerHTML='<p class="comment-empty">'+safe(err.message)+'</p>';}
  }
  async function sendComment() {
    if(sending)return;
    const input=$('cmtInput'),text=input.value.trim(),videoId=currentCommentVideoId,target=replyTarget;
    if(!text||!videoId)return;
    if(text.length>1000)return toast('Keep your comment within 1,000 characters.');
    sending=true;$('commentSend').disabled=true;
    try {
      const user=check(await db.auth.getUser())?.user;if(!user)throw new Error('Please log in first.');
      if(target)check(await db.from('vh_comment_replies').insert({comment_id:target.commentId,video_id:videoId,user_id:user.id,reply_to_id:target.replyId,body:text}));
      else {const profile=await getCurrentProfile();if(!profile)throw new Error('Could not load your profile.');check(await db.from('comment').insert({video_id:videoId,username:profile.username,comment_text:text}));}
      if(currentCommentVideoId===videoId){if(input.value.trim()===text)input.value='';cancelReply();await loadComments(videoId);}
      await updateCount(videoId);toast(target?'Reply posted':'Comment posted');
    }catch(err){toast(err.message);}finally{sending=false;$('commentSend').disabled=false;}
  }
  function onFeedVideo(video) {
    const id=video?.closest('.vid')?.dataset.videoId;
    if(id&&$('app').classList.contains('comments-open')&&currentCommentVideoId!==id){selectVideo(id);loadComments(id);}
  }
  function onNavigate(next) {
    if(next!=='create' && processCancel)processCancel('Sound processing cancelled because you left the upload page.');
    $('soundPlayer').pause();
    if(next!=='soundPage')soundEpoch++;
    commentEpoch++;
    if(next==='login'){chosenSound=null;currentSound=null;cancelReply();clearSelectedSound();}
  }
  async function prepareSoundLabels(videos) {
    try {
      const ids=[...new Set(videos.map(v=>v.original_sound_id).filter(Boolean))];if(!ids.length)return;
      const sounds=check(await db.from('vh_sounds').select('id,source_video_id').in('id',ids))||[];
      const sourceIds=sounds.map(s=>s.source_video_id);
      const sources=sourceIds.length?check(await db.from('video').select('video_id,username').in('video_id',sourceIds))||[]:[];
      for(const s of sounds)labels.set(s.id,sources.find(v=>v.video_id===s.source_video_id)?.username||'creator');
    }catch(err){console.error('Sound labels:',err);}
  }
  function soundLabel(video){return labels.get(video.original_sound_id)||video.username||'creator';}
  async function openSound(videoId) {
    try {
      const video=check(await db.from('video').select('video_id,original_sound_id').eq('video_id',videoId).single());
      if(!video.original_sound_id)throw new Error('This video has no sound yet. Try refreshing the feed.');
      await openSoundId(video.original_sound_id);
    }catch(err){toast(err.message);}
  }
  async function openSoundId(id) {
    go('soundPage');const token=++soundEpoch;currentSound=null;
    $('soundTitle').textContent='Loading sound…';$('soundCreator').textContent='';$('soundUseCount').textContent='';$('soundVideos').replaceChildren();$('soundPlayer').removeAttribute('src');$('soundStatus').textContent='';$('useSound').disabled=true;$('saveSound').disabled=true;
    try {
      const sound=check(await db.from('vh_sounds').select('id,source_video_id,owner_id').eq('id',id).single());
      const source=check(await db.from('video').select('video_id,video_url,username,user_id,privacy_status').eq('video_id',sound.source_video_id).single());
      if(!source.video_url)throw new Error('The original audio is unavailable.');
      const videos=check(await db.from('video').select('video_id,video_url,username,viewcount').eq('original_sound_id',id).eq('privacy_status','public').order('upload_date',{ascending:false}))||[];
      const user=check(await db.auth.getUser())?.user;
      const savedRow=user?check(await db.from('vh_saved_sounds').select('sound_id').eq('user_id',user.id).eq('sound_id',id).maybeSingle()):null;
      if(token!==soundEpoch||cur!=='soundPage')return;
      currentSound={...sound,url:source.video_url,username:source.username};saved=!!savedRow;
      $('soundTitle').textContent='Original sound — @'+(source.username||'creator');$('soundCreator').textContent='Created by @'+(source.username||'creator');$('soundUseCount').textContent=videos.length+' public '+(videos.length===1?'video':'videos');
      $('soundPlayer').src=source.video_url;$('useSound').disabled=false;$('saveSound').disabled=false;$('saveSound').textContent=saved?'Saved ✓':'Save sound';
      renderVideoGrid('soundVideos',videos);
    }catch(err){if(token===soundEpoch){$('soundTitle').textContent='Sound unavailable';$('soundStatus').textContent=err.message;}}
  }
  async function saveSound() {
    if(!currentSound||saving)return;const id=currentSound.id,wasSaved=saved;saving=true;$('saveSound').disabled=true;
    try {
      const user=check(await db.auth.getUser())?.user;if(!user)throw new Error('Log in to save sounds.');
      if(wasSaved)check(await db.from('vh_saved_sounds').delete().eq('user_id',user.id).eq('sound_id',id));
      else check(await db.from('vh_saved_sounds').insert({user_id:user.id,sound_id:id}));
      if(currentSound?.id===id){saved=!wasSaved;$('saveSound').textContent=saved?'Saved ✓':'Save sound';}
    }catch(err){toast(err.message);}finally{saving=false;$('saveSound').disabled=false;}
  }
  async function openSavedSounds() {
    go('savedSounds');$('savedSoundList').innerHTML='<p class="comment-empty">Loading saved sounds…</p>';
    try {
      const user=check(await db.auth.getUser())?.user;if(!user)throw new Error('Please log in first.');
      const rows=check(await db.from('vh_saved_sounds').select('sound_id').eq('user_id',user.id).order('created_at',{ascending:false}))||[];
      const ids=rows.map(r=>r.sound_id);
      const sounds=ids.length?check(await db.from('vh_sounds').select('id,source_video_id').in('id',ids))||[]:[];
      const sources=sounds.length?check(await db.from('video').select('video_id,username').in('video_id',sounds.map(s=>s.source_video_id)))||[]:[];
      if(cur!=='savedSounds')return;$('savedSoundList').replaceChildren();
      for(const row of rows){const sound=sounds.find(s=>s.id===row.sound_id);if(!sound)continue;const b=document.createElement('button');b.className='saved-sound-row';b.textContent='♫ Original sound — @'+(sources.find(v=>v.video_id===sound.source_video_id)?.username||'creator');b.onclick=()=>openSoundId(sound.id);$('savedSoundList').append(b);}
      if(!$('savedSoundList').children.length)$('savedSoundList').innerHTML='<p class="comment-empty">No available saved sounds yet.</p>';
    }catch(err){$('savedSoundList').innerHTML='<p class="comment-empty">'+safe(err.message)+'</p>';}
  }
  function useSound(){if(!currentSound)return;chosenSound={...currentSound};go('create');setSeg(0);$('selectedSound').hidden=false;$('selectedSound').querySelector('b').textContent='Original sound — @'+(chosenSound.username||'creator');toast('Choose a video to use this sound.');}
  function selectedSound(){return chosenSound;}
  function clearSelectedSound(){chosenSound=null;$('selectedSound').hidden=true;}
  async function applySound(file,sound) {
    if(!window.MediaRecorder||!window.AudioContext||!HTMLCanvasElement.prototype.captureStream)throw new Error('Sound reuse needs a browser with recording support, such as Chrome or Edge.');
    if(document.hidden)throw new Error('Keep this tab visible while applying the sound.');
    const source=await fetch(sound.url);if(!source.ok)throw new Error('Could not download the original sound.');
    const soundBlob=await source.blob(),video=document.createElement('video'),audio=document.createElement('audio'),canvas=document.createElement('canvas');
    const videoURL=URL.createObjectURL(file),audioURL=URL.createObjectURL(soundBlob);
    video.src=videoURL;video.muted=true;video.playsInline=true;audio.src=audioURL;audio.loop=true;
    let ctx,stream,recorder,frame=0,cancelHandler;
    try {
      await Promise.all([mediaReady(video),mediaReady(audio)]);
      if(!Number.isFinite(video.duration)||video.duration<=0)throw new Error('Could not read the selected video.');
      // Bound canvas dimensions for mobile memory while retaining the source aspect ratio.
      const scale=Math.min(1,1080/Math.max(video.videoWidth,video.videoHeight));
      canvas.width=Math.max(2,Math.floor(video.videoWidth*scale/2)*2);canvas.height=Math.max(2,Math.floor(video.videoHeight*scale/2)*2);
      ctx=new AudioContext();const dest=ctx.createMediaStreamDestination();ctx.createMediaElementSource(audio).connect(dest);
      await ctx.resume();stream=canvas.captureStream(30);dest.stream.getAudioTracks().forEach(track=>stream.addTrack(track));
      const mime=['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/mp4'].find(type=>MediaRecorder.isTypeSupported(type));if(!mime)throw new Error('This browser cannot create videos with sound.');
      recorder=new MediaRecorder(stream,{mimeType:mime});const chunks=[],draw=()=>{canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);frame=requestAnimationFrame(draw);};
      const result=new Promise((resolve,reject)=>{
        let failed=false;
        const fail=message=>{if(failed)return;failed=true;reject(new Error(message));if(recorder.state!=='inactive')recorder.stop();};
        processCancel=fail;
        recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recorder.onerror=()=>fail('Could not record the video.');
        recorder.onstop=()=>{if(!failed)resolve(new Blob(chunks,{type:mime}));};
        video.onended=()=>{if(recorder.state!=='inactive')recorder.stop();};video.onerror=()=>fail('Could not read the selected video.');audio.onerror=()=>fail('Could not play this sound.');
        cancelHandler=()=>{if(document.hidden)fail('Sound processing stopped because this tab was hidden. Keep it visible and try again.');};
        document.addEventListener('visibilitychange',cancelHandler);
      });
      result.catch(()=>{}); // Handle cancellation even while media play promises are pending.
      canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);recorder.start(1000);draw();
      try {await Promise.all([video.play(),audio.play()]);}catch(err){if(recorder.state!=='inactive')recorder.stop();await result.catch(()=>{});throw new Error('Tap Post video again to allow audio processing.');}
      const blob=await result;if(!blob.size)throw new Error('No video was recorded.');
      return new File([blob],file.name.replace(/\.[^.]*$/,'')+(mime.includes('mp4')?'.mp4':'.webm'),{type:blob.type});
    }finally{processCancel=null;cancelAnimationFrame(frame);video.pause();audio.pause();if(recorder&&recorder.state!=='inactive')recorder.stop();stream?.getTracks().forEach(t=>t.stop());if(ctx)await ctx.close();if(cancelHandler)document.removeEventListener('visibilitychange',cancelHandler);URL.revokeObjectURL(videoURL);URL.revokeObjectURL(audioURL);}
  }
  function mediaReady(element){return new Promise((resolve,reject)=>{if(element.readyState>=2)return resolve();const timer=setTimeout(()=>{cleanup();reject(new Error('Timed out loading the media.'));},30000);function cleanup(){clearTimeout(timer);element.removeEventListener('loadeddata',ready);element.removeEventListener('error',error);}function ready(){cleanup();resolve();}function error(){cleanup();reject(new Error('The video or sound could not be decoded.'));}element.addEventListener('loadeddata',ready);element.addEventListener('error',error);element.load();});}
  // Refresh displayed relative times without refetching database rows.
  setInterval(()=>{if($('app').classList.contains('comments-open'))document.querySelectorAll('#cmtList time').forEach(el=>{el.textContent=commentTime(el.dataset.timestamp,el.dataset.legacyDate);});},60000);
  return {commentTime,selectVideo,cancelReply,reply,loadComments,sendComment,updateCount,onFeedVideo,onNavigate,prepareSoundLabels,soundLabel,openSound,openSoundId,saveSound,openSavedSounds,useSound,selectedSound,clearSelectedSound,applySound};
})();
