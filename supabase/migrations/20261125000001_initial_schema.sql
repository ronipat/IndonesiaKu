-- IndonesiaKu initial database schema, RLS policies, helper functions, and storage bucket

create extension if not exists pgcrypto;

create schema if not exists private;
grant usage on schema private to anon, authenticated;

-- 1. Provinces table (stores core metadata, description, and optional custom audio URL)
create table if not exists public.provinces (
  id text primary key,
  name text not null,
  capital text not null,
  island text not null,
  lat double precision not null,
  lng double precision not null,
  area_km2 integer not null default 0 check (area_km2 >= 0),
  population bigint not null default 0 check (population >= 0),
  description text not null default '',
  audio_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_provinces_island on public.provinces (island);

-- 2. Province gallery photos table
create table if not exists public.province_photos (
  id uuid primary key default gen_random_uuid(),
  province_id text not null references public.provinces(id) on delete cascade,
  url text not null,
  storage_path text,
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_province_photos_province_order
  on public.province_photos (province_id, sort_order, created_at);

-- 3. Admin allowlist table linked to Supabase Auth users
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'superadmin')),
  created_at timestamptz not null default now()
);

-- 4. Updated-at trigger for provinces (fixed search_path)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger trg_provinces_updated_at
  before update on public.provinces
  for each row
  execute function public.set_updated_at();

-- 5. Security-definer admin check helper in non-exposed private schema (prevents RLS recursion)
create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

-- 6. Island summary view ordered by Indonesian archipelago geography
create or replace view public.island_groups
with (security_invoker = true) as
select
  island as name,
  count(*)::integer as province_count,
  coalesce(sum(population), 0)::bigint as total_population
from public.provinces
group by island
order by
  case island
    when 'Sumatra' then 1
    when 'Java' then 2
    when 'Bali & Nusa Tenggara' then 3
    when 'Kalimantan' then 4
    when 'Sulawesi' then 5
    when 'Maluku' then 6
    when 'Papua' then 7
    else 99
  end,
  island;

-- 7. Explicit role grants for Data API exposure
grant select on public.provinces, public.province_photos, public.island_groups to anon, authenticated;
grant insert, update, delete on public.provinces, public.province_photos to authenticated;
grant select on public.admin_users to authenticated;

-- 8. Row Level Security
alter table public.provinces enable row level security;
alter table public.province_photos enable row level security;
alter table public.admin_users enable row level security;

do $$
begin
  -- Provinces policies: public read, admin write
  begin
    create policy "Public can read provinces"
      on public.provinces for select to anon, authenticated using (true);
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can insert provinces"
      on public.provinces for insert to authenticated with check (private.is_admin());
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can update provinces"
      on public.provinces for update to authenticated
      using (private.is_admin()) with check (private.is_admin());
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can delete provinces"
      on public.provinces for delete to authenticated using (private.is_admin());
  exception when duplicate_object then null;
  end;

  -- Province photos policies: public read, admin write
  begin
    create policy "Public can read province photos"
      on public.province_photos for select to anon, authenticated using (true);
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can insert province photos"
      on public.province_photos for insert to authenticated with check (private.is_admin());
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can update province photos"
      on public.province_photos for update to authenticated
      using (private.is_admin()) with check (private.is_admin());
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can delete province photos"
      on public.province_photos for delete to authenticated using (private.is_admin());
  exception when duplicate_object then null;
  end;

  -- Admin users policies: authenticated users can inspect their own membership; admins can read list
  begin
    create policy "Users can read own admin status"
      on public.admin_users for select to authenticated
      using ((select auth.uid()) = user_id or private.is_admin());
  exception when duplicate_object then null;
  end;
end $$;

-- 9. Public Storage bucket for province gallery images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'province-gallery',
  'province-gallery',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

do $$
begin
  begin
    create policy "Public can view province gallery images"
      on storage.objects for select to anon, authenticated
      using (bucket_id = 'province-gallery');
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can upload province gallery images"
      on storage.objects for insert to authenticated
      with check (bucket_id = 'province-gallery' and private.is_admin());
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can update province gallery images"
      on storage.objects for update to authenticated
      using (bucket_id = 'province-gallery' and private.is_admin())
      with check (bucket_id = 'province-gallery' and private.is_admin());
  exception when duplicate_object then null;
  end;

  begin
    create policy "Admins can delete province gallery images"
      on storage.objects for delete to authenticated
      using (bucket_id = 'province-gallery' and private.is_admin());
  exception when duplicate_object then null;
  end;
end $$;
