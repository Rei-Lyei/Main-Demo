-- Additive update: existing comments, videos, sounds, and policies are preserved.
alter table public.comment add column if not exists created_at timestamptz;
alter table public.comment alter column created_at set default now();
create unique index if not exists vh_comment_video_identity on public.comment(comment_id,video_id);

create table public.vh_comment_replies (
 id uuid primary key default gen_random_uuid(),
 comment_id uuid not null,
 video_id uuid not null references public.video(video_id),
 user_id uuid not null references auth.users(id),
 reply_to_id uuid,
 body text not null check(char_length(btrim(body)) between 1 and 1000),
 created_at timestamptz not null default now(),
 unique(comment_id,id),
 foreign key(comment_id,video_id) references public.comment(comment_id,video_id),
 foreign key(comment_id,reply_to_id) references public.vh_comment_replies(comment_id,id),
 check(reply_to_id is null or reply_to_id<>id)
);
create index vh_replies_video_time on public.vh_comment_replies(video_id,created_at);
alter table public.vh_comment_replies enable row level security;
grant select on public.vh_comment_replies to anon,authenticated;
grant insert on public.vh_comment_replies to authenticated;
create policy vh_replies_read on public.vh_comment_replies for select to anon,authenticated
 using(exists(select 1 from public.video v where v.video_id=vh_comment_replies.video_id and (v.privacy_status='public' or v.user_id=(select auth.uid()))));
create policy vh_replies_insert on public.vh_comment_replies for insert to authenticated
 with check(user_id=(select auth.uid()) and exists(select 1 from public.video v where v.video_id=vh_comment_replies.video_id and (v.privacy_status='public' or v.user_id=(select auth.uid()))));

create table public.vh_sounds (
 id uuid primary key default gen_random_uuid(),
 source_video_id uuid not null unique references public.video(video_id),
 owner_id uuid not null references auth.users(id),
 created_at timestamptz not null default now()
);
create index vh_sounds_owner on public.vh_sounds(owner_id);
alter table public.vh_sounds enable row level security;
grant select on public.vh_sounds to anon,authenticated;
grant insert on public.vh_sounds to authenticated;
create policy vh_sounds_read on public.vh_sounds for select to anon,authenticated
 using(exists(select 1 from public.video v where v.video_id=vh_sounds.source_video_id and (v.privacy_status='public' or v.user_id=(select auth.uid()))));
create policy vh_sounds_insert on public.vh_sounds for insert to authenticated
 with check(owner_id=(select auth.uid()) and exists(select 1 from public.video v where v.video_id=vh_sounds.source_video_id and v.user_id=(select auth.uid())));
alter table public.video add column original_sound_id uuid references public.vh_sounds(id);
create index vh_video_sound on public.video(original_sound_id);
create policy vh_video_sound_insert on public.video as restrictive for insert to authenticated
 with check(original_sound_id is null or exists(select 1 from public.vh_sounds s where s.id=video.original_sound_id));
create policy vh_video_sound_update on public.video as restrictive for update to authenticated
 using(true) with check(original_sound_id is null or exists(select 1 from public.vh_sounds s where s.id=video.original_sound_id));

create table public.vh_saved_sounds (
 user_id uuid not null references auth.users(id),
 sound_id uuid not null references public.vh_sounds(id),
 created_at timestamptz not null default now(),
 primary key(user_id,sound_id)
);
alter table public.vh_saved_sounds enable row level security;
grant select,insert,delete on public.vh_saved_sounds to authenticated;
create policy vh_saved_read on public.vh_saved_sounds for select to authenticated using(user_id=(select auth.uid()));
create policy vh_saved_insert on public.vh_saved_sounds for insert to authenticated
 with check(user_id=(select auth.uid()) and exists(select 1 from public.vh_sounds s where s.id=vh_saved_sounds.sound_id));
create policy vh_saved_delete on public.vh_saved_sounds for delete to authenticated using(user_id=(select auth.uid()));

-- Register old videos without overwriting their media or captions.
insert into public.vh_sounds(source_video_id,owner_id) select video_id,user_id from public.video;
update public.video v set original_sound_id=s.id from public.vh_sounds s where s.source_video_id=v.video_id and v.original_sound_id is null;

-- Invoker trigger: uses the uploader's existing permissions, never bypasses RLS.
create function public.vh_register_original_sound() returns trigger
 language plpgsql security invoker set search_path=public,pg_temp as $$
declare sound_uuid uuid;
begin
 if new.original_sound_id is null then
  insert into public.vh_sounds(source_video_id,owner_id) values(new.video_id,new.user_id) returning id into sound_uuid;
  update public.video set original_sound_id=sound_uuid where video_id=new.video_id;
 end if;
 return new;
end;
$$;
revoke all on function public.vh_register_original_sound() from public;
create trigger vh_video_register_sound after insert on public.video for each row execute function public.vh_register_original_sound();

-- Existing video permissions are column-scoped; explicitly grant the new field.
grant update(original_sound_id),insert(original_sound_id) on public.video to authenticated;
create index vh_replies_thread_video on public.vh_comment_replies(comment_id,video_id);
create index vh_replies_target on public.vh_comment_replies(comment_id,reply_to_id);
create index vh_replies_author on public.vh_comment_replies(user_id);
create index vh_saved_sound on public.vh_saved_sounds(sound_id);

-- Remove inherited default grants; keep only the operations these features use.
revoke all on public.vh_comment_replies,public.vh_sounds,public.vh_saved_sounds from anon,authenticated; grant select on public.vh_comment_replies,public.vh_sounds to anon,authenticated; grant insert on public.vh_comment_replies,public.vh_sounds to authenticated; grant select,insert,delete on public.vh_saved_sounds to authenticated;
