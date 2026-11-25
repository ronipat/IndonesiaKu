import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './lib/i18n.js';
import AdminPage from './pages/AdminPage.jsx';
import MapPage from './pages/MapPage.jsx';

function AppContent({ theme, toggleTheme, themeOverlayState }) {
  const { t } = useLanguage();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/admin" element={<AdminPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {themeOverlayState !== 'idle' && (
        <div
          className={`global-transition-loader${themeOverlayState === 'leaving' ? ' is-leaving' : ''}`}
          role="status"
          aria-live="polite"
        >
          <div className="map-move-loader-badge">
            <div className="map-spinner map-spinner-sm" aria-hidden="true" />
          </div>
          <p className="map-loading-text">{t('app.switchingTheme')}</p>
        </div>
      )}
    </BrowserRouter>
  );
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const t = document.documentElement.getAttribute('data-theme');
    return t === 'dark' || t === 'cartoon' ? t : 'light';
  });
  const [themeOverlayState, setThemeOverlayState] = useState('idle');
  const timersRef = useRef({
    leaveTimer: null,
    doneTimer: null,
    raf1: null,
    raf2: null,
  });

  const clearThemeTimers = useCallback(() => {
    const refs = timersRef.current;
    if (refs.leaveTimer) {
      clearTimeout(refs.leaveTimer);
      refs.leaveTimer = null;
    }
    if (refs.doneTimer) {
      clearTimeout(refs.doneTimer);
      refs.doneTimer = null;
    }
    if (refs.raf1) {
      cancelAnimationFrame(refs.raf1);
      refs.raf1 = null;
    }
    if (refs.raf2) {
      cancelAnimationFrame(refs.raf2);
      refs.raf2 = null;
    }
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage failures in restricted contexts.
    }
  }, [theme]);

  useEffect(() => {
    return () => {
      clearThemeTimers();
      document.documentElement.classList.remove('theme-switching');
    };
  }, [clearThemeTimers]);

  const toggleTheme = useCallback(() => {
    clearThemeTimers();
    const root = document.documentElement;
    root.classList.add('theme-switching');

    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'cartoon' : 'light';
    root.setAttribute('data-theme', nextTheme);
    setTheme(nextTheme);
    setThemeOverlayState('visible');

    timersRef.current.raf1 = requestAnimationFrame(() => {
      timersRef.current.raf1 = null;
      timersRef.current.raf2 = requestAnimationFrame(() => {
        timersRef.current.raf2 = null;
        root.classList.remove('theme-switching');
      });
    });

    timersRef.current.leaveTimer = setTimeout(() => {
      timersRef.current.leaveTimer = null;
      setThemeOverlayState('leaving');
    }, 220);

    timersRef.current.doneTimer = setTimeout(() => {
      timersRef.current.doneTimer = null;
      setThemeOverlayState('idle');
    }, 400);
  }, [clearThemeTimers, theme]);

  return (
    <LanguageProvider>
      <AppContent
        theme={theme}
        toggleTheme={toggleTheme}
        themeOverlayState={themeOverlayState}
      />
    </LanguageProvider>
  );
}
