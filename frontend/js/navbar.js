/**
 * navbar.js — Navbar interactions
 * Handles: scroll state, mobile menu, active link highlighting, smooth scroll
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const navbar       = document.getElementById('navbar');
    const hamburger    = document.getElementById('navbar-hamburger');
    const mobileMenu   = document.getElementById('navbar-mobile');
    const mobileLinks  = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    // ── Scroll state ──────────────────────────────────
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const current = window.scrollY;

      if (navbar) {
        if (current > 10) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      lastScroll = current;
    }, { passive: true });

    // ── Mobile menu toggle ─────────────────────────────
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close on link click
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });

      // Close on outside click
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    }

    // ── Active link highlighting ───────────────────────
    function setActiveLink() {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const allLinks = document.querySelectorAll('.navbar-links a, .navbar-mobile a');
      allLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        const hrefFile = href.split('/').pop();
        link.classList.toggle('active',
          hrefFile === currentPath ||
          (currentPath === 'index.html' && (hrefFile === '' || hrefFile === '#'))
        );
      });
    }

    setActiveLink();

    // ── Smooth scroll for anchor links ────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const navHeight = navbar ? navbar.offsetHeight : 0;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  });
})();
