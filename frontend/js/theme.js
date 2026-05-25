/**
 * theme.js — Light/Dark theme manager
 * Persists preference in localStorage, respects system preference
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'psa-theme';
  const DARK  = 'dark';
  const LIGHT = 'light';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update all toggle buttons
    document.querySelectorAll('.btn-theme').forEach(btn => {
      btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
      btn.innerHTML = theme === DARK ? iconMoon() : iconSun();
    });
  }

  function iconMoon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>`;
  }

  function iconSun() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>`;
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || DARK;
    applyTheme(current === DARK ? LIGHT : DARK);
  }

  // Apply immediately on script load (before DOM ready) to avoid flash
  applyTheme(getPreferred());

  // Wire up buttons after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-theme').forEach(btn => {
      btn.addEventListener('click', toggle);
    });

    // Re-apply to ensure icons are correct
    applyTheme(getPreferred());
  });

  // Expose globally
  window.PSATheme = { toggle, apply: applyTheme, get: getPreferred };
})();
