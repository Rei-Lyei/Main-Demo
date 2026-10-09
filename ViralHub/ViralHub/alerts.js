/* Private inbox activity and deduplicated video views. */
const Alerts=(()=>{
 const $=id=>document.getElementById(id);
 let userId=null,epoch=0,timer=null,request=0,rows=[],filter='all',limit=50,busy=false;
 const watches=new WeakMap();
 const check=r=>{if(r.error)throw new Error(r.error.message);return r.data;};
 function badge(count){
  document.querySelectorAll('[data-inbox-badge]').forEach(el=>{el.hidden=!count;el.textContent=count>99?'99+':String(count);});
  $('inboxUnread').textContent=count?count+' unread':'All caught up';
 }
 function stop(){epoch++;request++;clearInterval(timer);timer=null;userId=null;rows=[];badge(0);$('inboxList').replaceChildren();$('inboxMore').hidden=true;}
 async function start(){
  const token=++epoch;
  const user=check(await db.auth.getUser())?.user;if(token!==epoch)return;
  if(!user){stop();return;}
  if(userId!==user.id){rows=[];filter='all';limit=50;$('inboxList').replaceChildren();document.querySelectorAll('[data-activity-filter]').forEach(b=>b.classList.toggle('on',b.dataset.activityFilter==='all'));}
  userId=user.id;clearInterval(timer);await refresh();
  if(token!==epoch||!userId)return;
  timer=setInterval(()=>{if(!document.hidden)refresh().catch(console.error);},15000);
 }
 async function refresh(){
  if(!userId)return;const token=epoch,id=userId;
  const result=await db.from('vh_notifications').select('id',{count:'exact',head:true}).eq('recipient_id',id).is('read_at',null);
  if(token!==epoch||id!==userId)return;if(result.error){console.error(result.error);return;}
  badge(result.count||0);if(cur==='inbox')await load(false);
 }
 async function load(loading=true){
  if(!userId)return;const token=++request,account=epoch,id=userId;
  if(loading)$('inboxList').innerHTML='<p class="comment-empty">Loading activity…</p>';
  try{
   let query=db.from('vh_notifications').select('id,actor_id,actor_username,kind,video_id,comment_id,reply_id,snippet,created_at,read_at',{count:'exact'}).eq('recipient_id',id);
   if(filter!=='all')query=query.eq('kind',filter);
   const result=await query.order('created_at',{ascending:false}).range(0,limit-1);const data=check(result)||[];
   if(token!==request||account!==epoch||id!==userId)return;
   rows=data;$('inboxList').replaceChildren();
   for(const row of rows){
    const button=document.createElement('button');button.className='activity-row'+(row.read_at?'':' unread');button.type='button';
    const avatar=document.createElement('span');avatar.className='activity-avatar';avatar.textContent=row.actor_username.slice(0,1).toUpperCase();avatar.setAttribute('aria-hidden','true');
    const body=document.createElement('span');body.className='activity-body';
    const title=document.createElement('span');title.className='activity-title';title.textContent='@'+row.actor_username+' '+(row.kind==='follow'?'started following you':row.kind==='comment'?'commented on your video':'replied in your conversation');
    body.append(title);
    if(row.snippet){const snippet=document.createElement('span');snippet.className='activity-snippet';snippet.textContent=row.snippet;body.append(snippet);}
    const time=document.createElement('time');time.textContent=Social.commentTime(row.created_at);time.dateTime=row.created_at;body.append(time);
    const dot=document.createElement('span');dot.className='activity-dot';dot.hidden=!!row.read_at;
    button.append(avatar,body,dot);button.onclick=()=>open(row);$('inboxList').append(button);
   }
   if(!rows.length)$('inboxList').innerHTML='<div class="inbox-empty"><h2>No activity yet</h2><p>New follows, comments, and replies will appear here.</p></div>';
   $('inboxMore').hidden=limit>=(result.count||0);
  }catch(err){if(token===request&&account===epoch)$('inboxList').innerHTML='<p class="comment-empty">Could not load activity. Use Refresh to try again.</p>';console.error(err);}
 }
 function setFilter(value){filter=value;limit=50;document.querySelectorAll('[data-activity-filter]').forEach(b=>b.classList.toggle('on',b.dataset.activityFilter===value));load();}
 function more(){limit+=50;load(false);}
 async function markAll(){
  if(!userId||busy)return;busy=true;$('inboxMarkAll').disabled=true;
  try{check(await db.from('vh_notifications').update({read_at:new Date().toISOString()}).eq('recipient_id',userId).is('read_at',null));await refresh();}
  catch(err){toast(err.message);}finally{busy=false;$('inboxMarkAll').disabled=false;}
 }
 async function open(row){
  const account=epoch;
  try{
   if(!row.read_at)check(await db.from('vh_notifications').update({read_at:new Date().toISOString()}).eq('id',row.id).eq('recipient_id',userId));
   if(account!==epoch)return;refresh().catch(console.error);
   if(row.kind==='follow')await openRealCreator({stopPropagation(){}},row.actor_id);
   else{
    await openVideo(row.video_id);
    if(account!==epoch)return;
    await openRealComments({stopPropagation(){}},row.video_id);
    if(row.comment_id){
     const thread=document.querySelector(`#cmtList [data-comment-id="${row.comment_id}"]`);
     const details=thread?.querySelector('details');if(details&&row.reply_id)details.open=true;
     thread?.scrollIntoView({block:'center',behavior:'smooth'});
    }
   }
  }catch(err){toast(err.message||'This activity is no longer available.');}
 }
 async function openVideo(id){
  closeSheets();
  const video=check(await db.from('video').select('video_id,viewcount').eq('video_id',id).eq('privacy_status','public').maybeSingle());
  if(!video)throw new Error('This video is no longer available.');
  document.querySelectorAll('#feedtabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab==='foryou'));
  if(typeof Live!=='undefined')Live.showDirectory(false);$('feed').style.display='';
  go('home');await loadRealFeed();const card=document.querySelector(`#feed [data-video-id="${id}"]`);
  if(!card)throw new Error('This video is unavailable in your feed.');
  card.scrollIntoView({behavior:'instant',block:'start'});scheduleFeedPlayback();
 }
 function onNavigate(next){if(next==='inbox'&&userId)load();if(next==='login')stop();}
 function track(video){
  if(!userId||cur!=='home'||document.hidden||video.paused||video.seeking)return;
  const id=video.closest('.vid')?.dataset.videoId;if(!id)return;
  let watch=watches.get(video);if(!watch||watch.account!==epoch){watch={last:video.currentTime,total:0,sent:false,account:epoch};watches.set(video,watch);return;}
  const delta=video.currentTime-watch.last;watch.last=video.currentTime;
  if(delta>0&&delta<1.5)watch.total+=delta;
  if(watch.total<3||watch.sent)return;watch.sent=true;const token=epoch;
  db.rpc('vh_record_video_view',{p_video_id:id}).then(result=>{
   if(token!==epoch)return;
   if(result.error){watch.sent=false;console.error(result.error);return;}
   if(result.data!==null){const count=Number(result.data)||0;document.querySelectorAll(`[data-views-for="${id}"]`).forEach(el=>{el.textContent=el.classList.contains('video-viewcount')?'▷ '+nf(count):nf(count)+' views';el.setAttribute('aria-label',count+' views');});}
  }).catch(err=>{watch.sent=false;console.error(err);});
 }
 function resetWatchPosition(video){const watch=watches.get(video);if(watch)watch.last=video.currentTime;}
 return {start,stop,refresh,load,setFilter,more,markAll,onNavigate,track,resetWatchPosition,openVideo};
})();
