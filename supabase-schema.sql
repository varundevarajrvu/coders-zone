-- Coder's Zone — attempt history table.
-- Run this in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.attempts (
  id           bigint generated always as identity primary key,
  user_id      uuid not null references auth.users(id) on delete cascade,
  problem_slug text not null,
  language     text not null,
  solved       boolean not null default false,
  created_at   timestamptz not null default now()
);

alter table public.attempts enable row level security;

-- Each user can read and write only their own attempts.
create policy "own attempts - select" on public.attempts
  for select using (auth.uid() = user_id);

create policy "own attempts - insert" on public.attempts
  for insert with check (auth.uid() = user_id);

create index if not exists attempts_user_idx on public.attempts (user_id, created_at desc);
