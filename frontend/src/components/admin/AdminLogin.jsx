import { useState } from 'react';
import { signInAdmin } from '../../services/adminService.js';

export default function AdminLogin({
  sessionState,
  onLoginSuccess,
  onRecheck,
  onSignOut,
  onOpenSetup,
}) {
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
          <span className="gallery-pill">Access Required</span>
          <h2>Account Not Authorized as Admin</h2>
          <p className="admin-auth-sub">
            Signed in as <strong>{sessionState.user.email}</strong> (UID:{' '}
            <code>{sessionState.user.id}</code>), which is not listed in{' '}
            <code>public.admin_users</code> yet.
          </p>

          <p className="admin-auth-sub">
            Run this SQL snippet in your Supabase SQL Editor to grant admin access:
          </p>
          <pre className="setup-code">{sqlSnippet}</pre>

          <div className="admin-auth-actions">
            <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCopy}>
              {copied ? 'Copied SQL!' : 'Copy SQL'}
            </button>
            <button type="button" className="admin-btn admin-btn-primary" onClick={onRecheck}>
              Recheck Access
            </button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={onSignOut}>
              Sign Out
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
        <h2>Admin Sign In</h2>
        <p className="admin-auth-sub">
          Sign in with your Supabase Auth admin account to maintain province descriptions and
          galleries.
        </p>

        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-auth-form">
          <label className="admin-field">
            <span>Email</span>
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
            <span>Password</span>
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
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="admin-auth-footer">
          <button type="button" className="admin-link-btn" onClick={onOpenSetup}>
            Need to configure Supabase admin_users? View setup guide
          </button>
        </div>
      </section>
    </div>
  );
}
