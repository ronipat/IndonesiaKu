import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage.jsx';
import MapPage from './pages/MapPage.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => {
    const t = document.documentElement.getAttribute('data-theme');
    return t === 'dark' || t === 'cartoon' ? t : 'light';
  });
  const [themeSwitching, setThemeSwitching] = useState(false);
  const themeTimerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Ignore storage failures in restricted contexts.
    }
  }, [theme]);

  useEffect(() => {
    return () => {
      if (themeTimerRef.current) {
        clearTimeout(themeTimerRef.current);
      }
    };
  }, []);

  const toggleTheme = useCallback(() => {
    if (themeTimerRef.current) {
      clearTimeout(themeTimerRef.current);
    }
    setThemeSwitching(true);
    setTheme((t) => (t === 'light' ? 'dark' : t === 'dark' ? 'cartoon' : 'light'));
    themeTimerRef.current = setTimeout(() => {
      themeTimerRef.current = null;
      setThemeSwitching(false);
    }, 450);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MapPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/admin" element={<AdminPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {themeSwitching && (
        <div className="global-transition-loader" role="status" aria-live="polite">
          <div className="map-move-loader-badge">
            <div className="map-spinner map-spinner-sm" aria-hidden="true" />
          </div>
          <p className="map-loading-text">Switching theme...</p>
        </div>
      )}
    </BrowserRouter>
  );
}
