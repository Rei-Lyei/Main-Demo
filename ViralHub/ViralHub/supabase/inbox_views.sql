-- New activity only. Existing follows, comments, replies, videos and counters stay intact.
create schema if not exists vh_internal;
revoke all on schema vh_internal from public,anon;
grant usage on schema vh_internal to authenticated;

create table public.vh_notifications (
 id uuid primary key default gen_random_uuid(),
 recipient_id uuid not null references auth.users(id),
 actor_id uuid not null references auth.users(id),
 actor_username text not null,
 kind text not null check(kind in ('follow','comment','reply')),
 source_id uuid not null,
 video_id uuid,
 comment_id uuid,
 reply_id uuid,
 snippet text not null default '',
 created_at timestamptz not null default now(),
 read_at timestamptz,
 unique(recipient_id,kind,source_id),
 check(recipient_id<>actor_id)
);
create index vh_notifications_inbox on public.vh_notifications(recipient_id,created_at desc);
create index vh_notifications_unread on public.vh_notifications(recipient_id) where read_at is null;
create index vh_notifications_actor on public.vh_notifications(actor_id);
alter table public.vh_notifications enable row level security;
revoke all on public.vh_notifications from public,anon,authenticated;
grant select,update(read_at) on public.vh_notifications to authenticated;
create policy vh_notifications_read on public.vh_notifications for select to authenticated using(recipient_id=(select auth.uid()));
create policy vh_notifications_mark_read on public.vh_notifications for update to authenticated using(recipient_id=(select auth.uid())) with check(recipient_id=(select auth.uid()));

-- This private trigger writes to recipients' inboxes on behalf of verified actors.
create function vh_internal.notify_activity() returns trigger language plpgsql security definer set search_path=pg_catalog as $$
declare actor uuid; actor_name text; target uuid; owner_uuid uuid; root_uuid uuid; video_uuid uuid; comment_uuid uuid; reply_uuid uuid; source_uuid uuid; event_kind text; message_text text:='';
begin
 if tg_table_name='following' then
  actor:=new.user_id; select user_id into target from public.users where username=new.following_username;
  event_kind:='follow';source_uuid:=new.following_id;
 elsif tg_table_name='comment' then
  select user_id into actor from public.users where username=new.username;
  select user_id into target from public.video where video_id=new.video_id;
  event_kind:='comment';source_uuid:=new.comment_id;video_uuid:=new.video_id;comment_uuid:=new.comment_id;message_text:=left(new.comment_text,160);
 else
  actor:=new.user_id;video_uuid:=new.video_id;comment_uuid:=new.comment_id;reply_uuid:=new.id;source_uuid:=new.id;event_kind:='reply';message_text:=left(new.body,160);
  select v.user_id into owner_uuid from public.video v where v.video_id=new.video_id;
  select u.user_id into root_uuid from public.comment c join public.users u on u.username=c.username where c.comment_id=new.comment_id;
  if new.reply_to_id is not null then select user_id into target from public.vh_comment_replies where id=new.reply_to_id; else target:=root_uuid; end if;
 end if;
 -- Never trust a client-supplied recipient or author identity.
 if auth.uid() is null or actor is distinct from auth.uid() then return new; end if;
 if video_uuid is not null and not exists(select 1 from public.video where video_id=video_uuid and (privacy_status='public' or user_id=actor)) then return new;end if;
 select username into actor_name from public.users where user_id=actor;
 if actor_name is null then return new;end if;
 for target in select distinct x from unnest(array[target,owner_uuid]) x where x is not null and x<>actor loop
  if not exists(select 1 from public.blocked_users b where (b.user_id=target and b.blocked_user_id=actor) or (b.user_id=actor and b.blocked_user_id=target)) then
   insert into public.vh_notifications(recipient_id,actor_id,actor_username,kind,source_id,video_id,comment_id,reply_id,snippet)
    values(target,actor,actor_name,event_kind,source_uuid,video_uuid,comment_uuid,reply_uuid,message_text)
    on conflict(recipient_id,kind,source_id) do nothing;
  end if;
 end loop;
 return new;
end; $$;
revoke all on function vh_internal.notify_activity() from public,anon,authenticated;
create trigger vh_notify_follow after insert on public.following for each row execute function vh_internal.notify_activity();
create trigger vh_notify_comment after insert on public.comment for each row execute function vh_internal.notify_activity();
create trigger vh_notify_reply after insert on public.vh_comment_replies for each row execute function vh_internal.notify_activity();

create table vh_internal.video_views (
 video_id uuid not null references public.video(video_id),
 user_id uuid not null references auth.users(id),
 viewed_on date not null default(current_timestamp at time zone 'UTC')::date,
 primary key(video_id,user_id,viewed_on)
);
create index vh_video_views_user on vh_internal.video_views(user_id);
alter table vh_internal.video_views enable row level security;
revoke all on vh_internal.video_views from public,anon,authenticated;

-- Controlled cross-owner counter update, with authentication and visibility checks.
create function vh_internal.record_video_view(p_video_id uuid) returns bigint language plpgsql security definer set search_path=pg_catalog as $$
declare viewer uuid:=auth.uid();owner_uuid uuid;current_count bigint;inserted integer;
begin
 if viewer is null then raise exception 'Sign in to record a view' using errcode='42501';end if;
 select user_id,viewcount into owner_uuid,current_count from public.video where video_id=p_video_id and (privacy_status='public' or user_id=viewer);
 if not found then return null;end if;
 if viewer=owner_uuid then return current_count;end if;
 if exists(select 1 from public.blocked_users where (user_id=viewer and blocked_user_id=owner_uuid) or (user_id=owner_uuid and blocked_user_id=viewer)) then return current_count;end if;
 insert into vh_internal.video_views(video_id,user_id) values(p_video_id,viewer) on conflict do nothing;
 get diagnostics inserted=row_count;
 if inserted=1 then update public.video set viewcount=coalesce(viewcount,0)+1 where video_id=p_video_id returning viewcount into current_count;
 else select viewcount into current_count from public.video where video_id=p_video_id;end if;
 return current_count;
end;$$;
revoke all on function vh_internal.record_video_view(uuid) from public,anon,authenticated;
grant execute on function vh_internal.record_video_view(uuid) to authenticated;
create function public.vh_record_video_view(p_video_id uuid) returns bigint language sql security invoker set search_path=pg_catalog as $$select vh_internal.record_video_view(p_video_id)$$;
revoke all on function public.vh_record_video_view(uuid) from public,anon,authenticated;
grant execute on function public.vh_record_video_view(uuid) to authenticated;

-- Explicitly deny direct client reads of tracking identities.
create policy vh_video_views_no_direct_read on vh_internal.video_views for select to anon,authenticated using(false);
