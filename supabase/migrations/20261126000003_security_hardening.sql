-- Security hardening migration:
-- 1. Revoke private schema/helper access from anonymous users
-- 2. Restrict province row insert/delete strictly to superadmins
-- 3. Enforce http(s) URL schemes on audio_url, video_url, and province_photos.url

revoke execute on function private.is_admin() from anon;
revoke usage on schema private from anon;

create or replace function private.is_superadmin()
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
      and role = 'superadmin'
  );
$$;

revoke all on function private.is_superadmin() from public, anon;
grant execute on function private.is_superadmin() to authenticated;

do $$
begin
  if exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'provinces' and policyname = 'Admins can insert provinces'
  ) then
    alter policy "Admins can insert provinces"
      on public.provinces
      with check (private.is_superadmin());
  end if;

  if exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'provinces' and policyname = 'Admins can delete provinces'
  ) then
    alter policy "Admins can delete provinces"
      on public.provinces
      using (private.is_superadmin());
  end if;
end $$;

do $$
begin
  begin
    alter table public.provinces
      add constraint chk_provinces_audio_url_http
      check (audio_url is null or audio_url ~* '^https?://') not valid;
  exception when duplicate_object then null;
  end;

  begin
    alter table public.provinces
      add constraint chk_provinces_video_url_http
      check (video_url is null or video_url ~* '^https?://') not valid;
  exception when duplicate_object then null;
  end;

  begin
    alter table public.province_photos
      add constraint chk_province_photos_url_http
      check (url ~* '^https?://') not valid;
  exception when duplicate_object then null;
  end;
end $$;
