/**
 * animations.js — Scroll-triggered fade-in and other UI effects
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {

    // ── Intersection Observer for fade-in-up ──────────
    if ('IntersectionObserver' in window) {
      const observerOpts = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      };

      const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = `opacity 0.5s ease ${entry.target.dataset.delay || '0s'},
                                             transform 0.5s ease ${entry.target.dataset.delay || '0s'}`;
            fadeObserver.unobserve(entry.target);
          }
        });
      }, observerOpts);

      // Mark elements for animation
      document.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(20px)';
        el.dataset.delay   = `${i * 0.07}s`;
        fadeObserver.observe(el);
      });

      // Feature cards with staggered delay
      document.querySelectorAll('.feature-card').forEach((card, i) => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(24px)';
        card.dataset.delay   = `${i * 0.08}s`;
        fadeObserver.observe(card);
      });

      // Tech cards
      document.querySelectorAll('.tech-card').forEach((card, i) => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(16px)';
        card.dataset.delay   = `${i * 0.05}s`;
        fadeObserver.observe(card);
      });
    }

    // ── Typed / typewriter effect for hero title ──────
    const typedEl = document.getElementById('hero-typed');
    if (typedEl) {
      const text = typedEl.dataset.text || typedEl.textContent;
      typedEl.textContent = '';
      typedEl.classList.add('cursor-blink');

      let i = 0;
      const speed = 38;

      function type() {
        if (i < text.length) {
          typedEl.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        } else {
          // Stop blinking after done
          setTimeout(() => typedEl.classList.remove('cursor-blink'), 1200);
        }
      }

      // Small delay before starting
      setTimeout(type, 400);
    }

    // ── Smooth counter animation ───────────────────────
    function animateCounter(el, target, suffix = '', duration = 1200) {
      const start = performance.now();
      const startVal = 0;

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.round(startVal + (target - startVal) * eased);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
      const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target  = parseInt(el.dataset.count, 10);
            const suffix  = el.dataset.suffix || '';
            animateCounter(el, target, suffix);
            counterObs.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));
    }
  });
})();
