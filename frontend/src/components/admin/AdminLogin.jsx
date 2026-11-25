import { useState } from 'react';
import { useLanguage } from '../../lib/i18n.js';
import { signInAdmin } from '../../services/adminService.js';

export default function AdminLogin({
  sessionState,
  onLoginSuccess,
  onRecheck,
  onSignOut,
  onOpenSetup,
}) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const nextSession = await signInAdmin(email, password);
      onLoginSuccess(nextSession);
    } catch (err) {
      setError(err.message || 'Sign in failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (sessionState?.user && !sessionState?.isAdmin) {
    const sqlSnippet = `insert into public.admin_users (user_id, email, role)\nvalues ('${sessionState.user.id}', '${sessionState.user.email || ''}', 'superadmin');`;

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(sqlSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    };

    return (
      <div className="admin-auth-wrap">
        <section className="admin-auth-card">
          <span className="gallery-pill">{t('login.accessRequired')}</span>
          <h2>{t('login.notAuthorizedTitle')}</h2>
          <p className="admin-auth-sub">
            {t('login.signedInAs')} <strong>{sessionState.user.email}</strong> (UID:{' '}
            <code>{sessionState.user.id}</code>), {t('login.notListed')}{' '}
            <code>public.admin_users</code> {t('login.yet')}
          </p>

          <p className="admin-auth-sub">{t('login.runSql')}</p>
          <pre className="setup-code">{sqlSnippet}</pre>

          <div className="admin-auth-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCopy}>
              {copied ? t('login.copiedSql') : t('login.copySql')}
            </button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={onRecheck}>
              {t('login.recheckAccess')}
            </button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={onSignOut}>
              {t('admin.signOut')}
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-auth-wrap">
      <section className="admin-auth-card">
        <span className="gallery-pill">IndonesiaKu CMS</span>
        <h2>{t('login.signInTitle')}</h2>
        <p className="admin-auth-sub">{t('login.signInSub')}</p>

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <label className="admin-field">
            <span>{t('login.email')}</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </label>
          <label className="admin-field">
            <span>{t('login.password')}</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            className="admin-btn admin-btn-primary admin-btn-full"
            disabled={submitting}
          >
            {submitting ? t('login.signingIn') : t('login.signInBtn')}
          </button>
        </form>

        <div className="admin-auth-footer">
          <button type="button" className="admin-link-btn" onClick={onOpenSetup}>
            {t('login.setupLink')}
          </button>
        </div>
      </section>
    </div>
  );
}
