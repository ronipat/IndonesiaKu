import { useLanguage } from '../lib/i18n.js';

export default function SupabaseSetupModal({ open, onClose }) {
  const { t } = useLanguage();
  if (!open) return null;

  return (
    <div
      className="province-popups-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="province-popup setup-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="supabase-setup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-header">
          <div>
            <span className="gallery-pill">{t('setup.pill')}</span>
            <h2 id="supabase-setup-title">{t('setup.title')}</h2>
          </div>
          <button
            type="button"
            className="detail-close-btn"
            onClick={onClose}
            aria-label="Close setup modal"
          >
            ×
          </button>
        </div>

        <p className="popup-description">
          IndonesiaKu runs in local Demo Mode (persisted in your browser) until{' '}
          <code>frontend/.env</code> is configured with a live Supabase project.
        </p>

        <ol className="setup-steps">
          <li>
            <strong>Create a Supabase project</strong> at supabase.com and copy your Project URL
            and <code>anon</code> public key.
          </li>
          <li>
            <strong>Run the SQL migrations</strong> in Supabase SQL Editor (or via{' '}
            <code>supabase db push</code>):
            <br />
            <code>supabase/migrations/20261125000001_initial_schema.sql</code>
            <br />
            <code>supabase/migrations/20261125000002_seed_provinces.sql</code>
          </li>
          <li>
            <strong>Create an Admin user</strong> in Supabase Authentication &rarr; Users, then run:
            <pre className="setup-code">
{`insert into public.admin_users (user_id, email, role)
values ('YOUR_AUTH_USER_UUID', 'admin@example.com', 'superadmin');`}
            </pre>
          </li>
          <li>
            <strong>Create <code>frontend/.env</code></strong> from{' '}
            <code>frontend/.env.example</code> with <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code>, then restart Vite.
          </li>
        </ol>

        <div className="popup-footer">
          <button type="button" className="tts-btn" onClick={onClose}>
            {t('setup.gotIt')}
          </button>
        </div>
      </section>
    </div>
  );
}
