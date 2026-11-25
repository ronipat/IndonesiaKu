# IndonesiaKu

An interactive full-stack web application exploring all **38 provinces of Indonesia**, built with a **React + Vite + Leaflet** frontend and a **Supabase** backend (PostgreSQL database, Row Level Security, Storage bucket, Auth, and Edge Function Admin API).

## Screenshots

### Interactive Map — Light Theme (English)
![IndonesiaKu Map — Light Theme](docs/screenshots/map-light.png)

### Interactive Map — Dark Theme (Bahasa Indonesia)
![IndonesiaKu Map — Dark Theme & Bahasa Indonesia](docs/screenshots/map-dark-id.png)

### Interactive Map — Cartoon Theme
![IndonesiaKu Map — Cartoon Theme](docs/screenshots/map-cartoon.png)

### Province Details, Live OpenStreetMap Minimap & Curated Photo Gallery
![Province Detail Popup & Photo Gallery](docs/screenshots/province-popup-gallery.png)

### Capital Video Player Popup
![Capital Video Player Popup](docs/screenshots/capital-video-popup.png)

### Admin CMS (`/admin`)
![IndonesiaKu Admin CMS](docs/screenshots/admin-page.png)

## Features

- **Interactive Map (`/`)**: Full-bleed Leaflet map with GeoJSON province boundaries, population-scaled island-group markers, debounced search, island-group filter chips, sidebar province selection (highlights and previews details without moving the map), bilingual `EN | ID` language switcher, and 3 themes (`light` soft pale-orange, high-contrast `dark`, and `cartoon`) with crisp `20px` background grids and atomic, flicker-free theme transitions.
- **Database-Backed Province Details & Photo Galleries**: Clicking a province on the map opens enlarged dual popups (`540px` detail popup and `680px` photo gallery popup with a `400px` stage), featuring a live original-color OpenStreetMap minimap with GeoJSON province outline and capital marker across all themes, curated scenic Wikimedia landscape photos (`156` across all 38 provinces), enriched regional descriptions in both English and Bahasa Indonesia (`description_id`), demographic stats, and full non-scrolling description layout.
- **Bilingual HD Natural Voice Narration (`ttsService.js`)**: Automatically prioritizes Neural/Natural/Online/Premium browser voices in either English or Indonesian (`id-ID`, including Gadis, Damayanti, Google Bahasa Indonesia, and Ardi) over legacy robotic voices, with sentence-by-sentence playback (`160ms` pauses), a 5-second auto-play delay when opening province details, plus optional custom `audio_url` playback in English mode.
- **Capital Video Player Popup (`CapitalVideoPopup.jsx`)**: Clicking any provincial capital marker on the map opens a compact-header/footer 16:9 video modal without zooming the map (`1` configurable video per capital), supporting YouTube, Vimeo, Google Drive, and direct MP4/WebM links, with a 5-second countdown overlay and immediate **Play Now** action.
- **Streamlined Admin CMS (`/admin`)**: Clean bilingual (`EN | ID`) editorial workspace with decoupled `Admin` badge, 4 compact KPI summary cards (including a live photo coverage bar), equal-height province selector and editor panels, metadata & dual-language description editor (with English/Indonesian summary generators and independent **Test Voice (EN)** / **Test Voice (ID)** previews), **Capital Video URL** configuration with live provider detection, and `GalleryManager` (Supabase Storage uploads to `province-gallery`, external URLs, filtered Wikimedia Commons 1-click photo imports, captions, and reordering).
- **Instant Local Demo Mode**: When `frontend/.env` is not yet configured, IndonesiaKu automatically runs in browser-persisted Demo Mode (`localStorage`) seeded with all 38 provinces so you can test both `/` and `/admin` right away.

## Project Structure

```text
IndonesiaKu/
  README.md
  .gitignore
  docs/
    screenshots/
      map-light.png
      map-dark-id.png
      map-cartoon.png
      province-popup-gallery.png
      capital-video-popup.png
      admin-page.png
  scripts/
    seed-descriptions.mjs
    curate-scenic-photos.mjs
  supabase/
    config.toml
    migrations/
      20261125000001_initial_schema.sql
      20261125000002_seed_provinces.sql
      20261125000003_enrich_province_descriptions.sql
      20261125000004_seed_province_photos.sql
      20261126000001_add_capital_video_url.sql
      20261126000002_add_description_id.sql
    functions/
      admin-api/
        index.ts
  frontend/
    .env.example
    index.html
    package.json
    vite.config.js
    public/
      icon.png
      data/
        indonesia-provinces.geojson
    src/
      main.jsx
      App.jsx
      App.css
      styles/
        admin.css
      lib/
        supabase.js
        geoMappings.js
        i18n.js
      data/
        defaultProvinces.json
      utils/
        videoUrl.js
      services/
        wikimediaService.js
        provinceService.js
        adminService.js
        ttsService.js
      pages/
        MapPage.jsx
        AdminPage.jsx
      components/
        MapView.jsx
        Sidebar.jsx
        ProvincePopup.jsx
        ProvinceGalleryPopup.jsx
        CapitalVideoPopup.jsx
        SupabaseSetupModal.jsx
        admin/
          AdminLogin.jsx
          AdminDashboard.jsx
          GalleryManager.jsx
```

## Supabase Setup

### 1. Create a Supabase Project
Create a project at [supabase.com](https://supabase.com) and locate your **Project URL** and **anon public key** under **Project Settings → API**.

### 2. Run the SQL Migrations
Run all 6 migrations in order via the **Supabase SQL Editor** (or push with the Supabase CLI using `supabase link` and `supabase db push`):

1. `supabase/migrations/20261125000001_initial_schema.sql` — creates `public.provinces`, `public.province_photos`, `public.admin_users`, `public.island_groups` view, `private.is_admin()` security helper, RLS policies, and the `province-gallery` Storage bucket.
2. `supabase/migrations/20261125000002_seed_provinces.sql` — idempotently seeds all 38 provinces of Indonesia across 7 island groups.
3. `supabase/migrations/20261125000003_enrich_province_descriptions.sql` — enriches geographical, cultural, and economic descriptions across all 38 provinces.
4. `supabase/migrations/20261125000004_seed_province_photos.sql` — idempotently seeds 156 curated scenic landscape Wikimedia/Wikipedia photos across all 38 provinces (minimum 3 per province).
5. `supabase/migrations/20261126000001_add_capital_video_url.sql` — adds the nullable `video_url text` column to `public.provinces` for capital video playback.
6. `supabase/migrations/20261126000002_add_description_id.sql` — adds `description_id text` to `public.provinces` and seeds Bahasa Indonesia descriptions for all 38 provinces.

### 3. Create an Admin Account
1. In **Supabase Dashboard → Authentication → Users**, create a user (email + password) and copy their User UID.
2. Grant them admin privileges by running in the **SQL Editor**:

```sql
insert into public.admin_users (user_id, email, role)
values ('YOUR_AUTH_USER_UUID', 'admin@example.com', 'superadmin');
```

### 4. Configure `frontend/.env`
Copy `frontend/.env.example` to `frontend/.env` and fill in your credentials:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_USE_ADMIN_EDGE_FUNCTION=false
```

### 5. (Optional) Deploy the `admin-api` Edge Function
By default, `/admin` calls Supabase PostgREST and Storage directly (enforced by PostgreSQL RLS via `private.is_admin()`). If you prefer routing admin writes through the dedicated Deno REST API (`supabase/functions/admin-api/index.ts`):

```powershell
supabase functions deploy admin-api --no-verify-jwt
```

Then set `VITE_USE_ADMIN_EDGE_FUNCTION=true` in `frontend/.env`.

## Running Locally

```powershell
cd frontend
npm install
npm run dev
```

- Public Map: [http://localhost:5173/](http://localhost:5173/)
- Admin CMS: [http://localhost:5173/admin](http://localhost:5173/admin)

## Production Build & SPA Routing

```powershell
cd frontend
npm run build
```

This outputs static assets to `frontend/dist/`. Since IndonesiaKu uses client-side routing (`/` and `/admin`), configure your static host (Vercel, Netlify, Cloudflare Pages, Nginx, etc.) with an SPA rewrite so unknown paths fall back to `index.html`.

## Changelog & Detailed Highlights

- **Backend & Data Enrichment**:
  - Normalized Supabase schema with 38 Indonesian provinces, enriched English & Bahasa Indonesia descriptions (`description_id`), 156 curated modern scenic photos, and per-province capital video URLs (`video_url`).
  - RLS-protected admin updates plus `admin-api` Edge Function support for `video_url` and `description_id` in `POST` and `PATCH` routes.
- **Interactive Map, Themes & Loaders**:
  - Eliminated initial OpenStreetMap tile flash on first render and fixed the Light → Dark theme-switch flicker via synchronous `useLayoutEffect` palette updates, atomic `html.theme-switching` transition suppression, and smooth `.global-transition-loader` fadeout.
  - Added uniform heavy frosted-blur spinners (`backdrop-filter: blur(24px)`) for initial load, Reset All (`550ms`), theme switches, map movement (`MapMovementTracker`), gallery loading, sidebar detail loading, and Admin session checks.
  - Refined light theme (`#FEF5EE` pale-orange canvas, `#D4A893` borders), high-contrast dark theme (`#11161D` / `#242D3A`), cartoon theme, and halved `20px` background grid cells.
  - Left sidebar province clicks update selection and sidebar stats cleanly without unwanted map panning or zooming.
- **Bilingual (`EN | ID`) UI, Minimap, Indonesian HD TTS & Capital Videos**:
  - Added segmented `EN | ID` switcher (`i18n.js`) translating map controls, hero, legend (`Sumatera`, `Jawa`), sidebar, popups, and Admin CMS.
  - Enlarged detail (`540px`) and gallery (`680px`, `400px` stage) popups with unobstructed full-height descriptions and live original-color OpenStreetMap minimaps across all themes.
  - Added `ttsService.js` for Neural/Natural HD voice prioritization in both English and Bahasa Indonesia (`id-ID`), sentence-level phrasing (`160ms` pauses), and 5-second auto-play delay.
  - Added `CapitalVideoPopup.jsx` and `videoUrl.js` so clicking a capital marker opens a compact 16:9 video modal without zooming the map, complete with a 5-second countdown overlay + **Play Now** control for YouTube, Vimeo, Google Drive, and direct MP4/WebM links.
- **Admin CMS Refinements (`/admin`)**:
  - Polished header branding (`IndonesiaKu` without gap or orange square) and decoupled `Admin` pill badge.
  - Compact 4-card KPI summary grid with accent bars, SVG icons, and live photo coverage meter, plus equal-height province list & editor panels.
  - Added **Description — Bahasa Indonesia** editor with **Test Voice (ID)** preview, **Capital Video URL** input with live provider detection badge, and upgraded Wikimedia Commons import filtering (`wikimediaService.js`).
