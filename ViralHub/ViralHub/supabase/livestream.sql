-- ViralHub livestreams. Separate tables preserve the existing legacy live data.
create table public.vh_streams (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 1 and 100), category text not null default 'Entertainment',
 status text not null default 'live' check(status in ('live','ended')),
 started_at timestamptz not null default now(), ended_at timestamptz,
 heartbeat_at timestamptz not null default now(), viewer_count integer not null default 0 check(viewer_count between 0 and 8),
 recording_state text not null default 'recording' check(recording_state in ('recording','uploading','ready','interrupted')),
 recording_mime text not null default 'video/webm', part_count integer not null default 0 check(part_count>=0)
);
create unique index vh_one_active_stream on public.vh_streams(owner_id) where status='live';
create index vh_streams_browse on public.vh_streams(status,heartbeat_at desc);
create index vh_streams_archive on public.vh_streams(owner_id,started_at desc);
create table public.vh_live_viewers (
 session_id uuid primary key, stream_id uuid not null references public.vh_streams on delete cascade,
 user_id uuid not null references auth.users on delete cascade, heartbeat_at timestamptz not null default now()
);
create index vh_viewers_stream on public.vh_live_viewers(stream_id,heartbeat_at);
create index vh_viewers_user on public.vh_live_viewers(user_id);
create table public.vh_live_bans (
 stream_id uuid not null references public.vh_streams on delete cascade,
 user_id uuid not null references auth.users on delete cascade, primary key(stream_id,user_id)
);
create index vh_bans_user on public.vh_live_bans(user_id);
create table public.vh_live_comments (
 id bigint generated always as identity primary key, stream_id uuid not null references public.vh_streams on delete cascade,
 user_id uuid not null references auth.users on delete cascade, body text not null check(char_length(btrim(body)) between 1 and 300),
 created_at timestamptz not null default now()
);
create index vh_comments_stream on public.vh_live_comments(stream_id,id);
create index vh_comments_user on public.vh_live_comments(user_id);
create table public.vh_live_likes (
 stream_id uuid not null references public.vh_streams on delete cascade,
 user_id uuid not null references auth.users on delete cascade, total bigint not null check(total>=1), primary key(stream_id,user_id)
);
create index vh_likes_user on public.vh_live_likes(user_id);
create table public.vh_live_signals (
 id bigint generated always as identity primary key, stream_id uuid not null references public.vh_streams on delete cascade,
 viewer_session uuid not null references public.vh_live_viewers(session_id) on delete cascade,
 sender_id uuid not null references auth.users on delete cascade, recipient_id uuid not null references auth.users on delete cascade,
 kind text not null check(kind in ('offer','answer','ice')), payload jsonb not null check(octet_length(payload::text)<65536),
 created_at timestamptz not null default now()
);
create index vh_signals_recipient on public.vh_live_signals(recipient_id,stream_id,id);
create index vh_signals_session on public.vh_live_signals(viewer_session);
create index vh_signals_sender on public.vh_live_signals(sender_id);
create index vh_signals_stream on public.vh_live_signals(stream_id);
create table public.vh_recording_parts (
 stream_id uuid not null references public.vh_streams on delete cascade,
 owner_id uuid not null references auth.users on delete cascade, part_no integer not null check(part_no>=0),
 path text not null, bytes integer not null check(bytes>0), primary key(stream_id,part_no),
 check(path=owner_id::text || '/' || stream_id::text || '/' || part_no::text || '.part')
);
create index vh_parts_owner on public.vh_recording_parts(owner_id);
alter table public.vh_streams enable row level security;
alter table public.vh_live_viewers enable row level security;
alter table public.vh_live_bans enable row level security;
alter table public.vh_live_comments enable row level security;
alter table public.vh_live_likes enable row level security;
alter table public.vh_live_signals enable row level security;
alter table public.vh_recording_parts enable row level security;
grant select,insert,update,delete on public.vh_streams,public.vh_live_viewers,public.vh_live_bans,public.vh_live_comments,public.vh_live_likes,public.vh_live_signals,public.vh_recording_parts to authenticated;
grant usage,select on sequence public.vh_live_comments_id_seq,public.vh_live_signals_id_seq to authenticated;
create policy stream_read on public.vh_streams for select to authenticated using(owner_id=(select auth.uid()) or (status='live' and heartbeat_at>now()-interval '60 seconds'));
create policy stream_insert on public.vh_streams for insert to authenticated with check(owner_id=(select auth.uid()));
create policy stream_update on public.vh_streams for update to authenticated using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
-- No stream DELETE grant via policy: archives remain recoverable.
create policy viewers_read on public.vh_live_viewers for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
create policy viewers_insert on public.vh_live_viewers for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.vh_streams s where s.id=stream_id and s.status='live' and s.heartbeat_at>now()-interval '60 seconds' and s.owner_id<>user_id));
create policy viewers_update on public.vh_live_viewers for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()) and exists(select 1 from public.vh_streams s where s.id=stream_id and s.status='live'));
create policy viewers_delete on public.vh_live_viewers for delete to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
create policy bans_read on public.vh_live_bans for select to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
create policy bans_insert on public.vh_live_bans for insert to authenticated with check(exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
create policy bans_delete on public.vh_live_bans for delete to authenticated using(exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
create policy comments_read on public.vh_live_comments for select to authenticated using(exists(select 1 from public.vh_streams s where s.id=stream_id));
create policy comments_insert on public.vh_live_comments for insert to authenticated with check(user_id=(select auth.uid()) and not exists(select 1 from public.vh_live_bans b where b.stream_id=vh_live_comments.stream_id and b.user_id=(select auth.uid())) and exists(select 1 from public.vh_streams s where s.id=stream_id and s.status='live' and s.heartbeat_at>now()-interval '60 seconds'));
create policy comments_delete on public.vh_live_comments for delete to authenticated using(user_id=(select auth.uid()) or exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
create policy likes_read on public.vh_live_likes for select to authenticated using(exists(select 1 from public.vh_streams s where s.id=stream_id));
create policy likes_insert on public.vh_live_likes for insert to authenticated with check(user_id=(select auth.uid()) and not exists(select 1 from public.vh_live_bans b where b.stream_id=vh_live_likes.stream_id and b.user_id=(select auth.uid())) and exists(select 1 from public.vh_streams s where s.id=stream_id and s.status='live' and s.heartbeat_at>now()-interval '60 seconds'));
create policy likes_update on public.vh_live_likes for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()) and not exists(select 1 from public.vh_live_bans b where b.stream_id=vh_live_likes.stream_id and b.user_id=(select auth.uid())) and exists(select 1 from public.vh_streams s where s.id=stream_id and s.status='live' and s.heartbeat_at>now()-interval '60 seconds'));
create policy signals_read on public.vh_live_signals for select to authenticated using((sender_id=(select auth.uid()) or recipient_id=(select auth.uid())) and exists(select 1 from public.vh_streams s where s.id=stream_id and s.status='live'));
create policy signals_insert on public.vh_live_signals for insert to authenticated with check(sender_id=(select auth.uid()) and exists(select 1 from public.vh_streams s join public.vh_live_viewers v on v.stream_id=s.id where s.id=vh_live_signals.stream_id and s.status='live' and s.heartbeat_at>now()-interval '60 seconds' and v.session_id=viewer_session and ((s.owner_id=sender_id and v.user_id=recipient_id) or (s.owner_id=recipient_id and v.user_id=sender_id))));
create policy signals_delete on public.vh_live_signals for delete to authenticated using(sender_id=(select auth.uid()) or exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
create policy parts_read on public.vh_recording_parts for select to authenticated using(owner_id=(select auth.uid()));
create policy parts_insert on public.vh_recording_parts for insert to authenticated with check(owner_id=(select auth.uid()) and exists(select 1 from public.vh_streams s where s.id=stream_id and s.owner_id=(select auth.uid())));
-- Atomic batched hearts: security invoker preserves the likes-table policies.
create function public.vh_add_hearts(p_stream uuid,p_count integer) returns void language plpgsql security invoker set search_path='' as $$
begin
 if auth.uid() is null or p_count not between 1 and 50 then raise exception 'Invalid heart request'; end if;
 insert into public.vh_live_likes(stream_id,user_id,total) values(p_stream,auth.uid(),p_count)
 on conflict(stream_id,user_id) do update set total=vh_live_likes.total+excluded.total;
end; $$;
revoke all on function public.vh_add_hearts(uuid,integer) from public,anon;
grant execute on function public.vh_add_hearts(uuid,integer) to authenticated;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('live-recordings','live-recordings',false,6291456,array['video/webm','video/mp4','application/octet-stream']);
create policy vh_recordings_read on storage.objects for select to authenticated using(bucket_id='live-recordings' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy vh_recordings_insert on storage.objects for insert to authenticated with check(bucket_id='live-recordings' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.vh_streams s where s.id::text=(storage.foldername(name))[2] and s.owner_id=(select auth.uid())));
-- All objects use unique part paths; replacement is intentionally unnecessary.
alter publication supabase_realtime add table public.vh_streams,public.vh_live_comments,public.vh_live_likes,public.vh_live_signals;
