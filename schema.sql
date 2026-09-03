-- THE WALL: database foundation
create table if not exists public.posts (
  id bigint generated always as identity primary key,
  content text not null check (char_length(content) between 1 and 500),
  category text not null check (category in ('Thought','Secret','Rant','Regret','Good')),
  status text not null default 'published'
    check (status in ('pending','published','hidden','removed')),
  like_count integer not null default 0 check (like_count >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.reports (
  id bigint generated always as identity primary key,
  post_id bigint not null references public.posts(id) on delete cascade,
  reason text not null check (char_length(reason) between 1 and 300),
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;
alter table public.reports enable row level security;

create policy "public can read published posts"
on public.posts for select to anon, authenticated
using (status = 'published');

create policy "public can create posts"
on public.posts for insert to anon, authenticated
with check (
  char_length(content) between 1 and 500
  and category in ('Thought','Secret','Rant','Regret','Good')
  and status = 'published'
);

create policy "public can report posts"
on public.reports for insert to anon, authenticated
with check (char_length(reason) between 1 and 300);

-- No public UPDATE or DELETE policy.
-- Production moderation/rate-limiting will be added before launch.
