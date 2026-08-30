-- Replace temporary authenticated-all policies with platform-admin-only access.
-- Safe default: until a user is explicitly added to platform_admins, CRM/knowledge tables are inaccessible to authenticated users.

create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.platform_admins enable row level security;

drop policy if exists "platform admins read own membership" on public.platform_admins;
create policy "platform admins read own membership" on public.platform_admins
for select to authenticated
using (user_id = auth.uid());

do $$
declare r record;
begin
  for r in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and policyname like 'authenticated manage %'
  loop
    execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

do $$
declare t text;
begin
  foreach t in array array[
    'prospects',
    'import_batches',
    'campaigns',
    'campaign_recipients',
    'email_queue',
    'suppressions',
    'outbound_settings',
    'tenants',
    'practice_sources',
    'practice_ingestion_runs',
    'practice_knowledge_items',
    'practice_knowledge_versions',
    'practice_knowledge_conflicts',
    'practice_knowledge_reviews'
  ] loop
    execute format(
      'create policy %I on public.%I for all to authenticated using (exists (select 1 from public.platform_admins pa where pa.user_id = auth.uid())) with check (exists (select 1 from public.platform_admins pa where pa.user_id = auth.uid()))',
      'platform admin manage ' || t,
      t
    );
  end loop;
end $$;
