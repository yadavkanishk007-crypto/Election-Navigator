/**
 * Accessibility Tests — DOM-based a11y validation
 */
import { describe, it, expect } from './test-runner.js';

export function runAccessibilityTests() {
  describe('Accessibility — ARIA Roles', () => {
    it('should have a banner role on header', () => {
      const header = document.getElementById('main-header');
      expect(header.getAttribute('role')).toBe('banner');
    });

    it('should have a main role on main content', () => {
      const main = document.getElementById('main-content');
      expect(main.getAttribute('role')).toBe('main');
    });

    it('should have contentinfo role on footer', () => {
      const footer = document.getElementById('main-footer');
      expect(footer.getAttribute('role')).toBe('contentinfo');
    });

    it('should have dialog role on modals', () => {
      const phaseModal = document.getElementById('phase-modal');
      const quizModal = document.getElementById('quiz-modal');
      expect(phaseModal.getAttribute('role')).toBe('dialog');
      expect(quizModal.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal on modals', () => {
      const phaseModal = document.getElementById('phase-modal');
      expect(phaseModal.getAttribute('aria-modal')).toBe('true');
    });
  });

  describe('Accessibility — Navigation', () => {
    it('should have a skip link', () => {
      const skipLink = document.getElementById('skip-link');
      expect(skipLink).toBeTruthy();
      expect(skipLink.getAttribute('href')).toBe('#hero');
    });

    it('should have nav with aria-label', () => {
      const navs = document.querySelectorAll('nav[aria-label]');
      expect(navs.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility — Buttons', () => {
    it('all buttons should have accessible names', () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach(btn => {
        const hasLabel = btn.getAttribute('aria-label') ||
                         btn.textContent.trim().length > 0;
        expect(hasLabel).toBeTruthy();
      });
    });
  });

  describe('Accessibility — Forms', () => {
    it('region input should have a label', () => {
      const input = document.getElementById('region-input');
      const label = document.querySelector('label[for="region-input"]');
      expect(label).toBeTruthy();
    });

    it('region input should have maxlength', () => {
      const input = document.getElementById('region-input');
      expect(input.getAttribute('maxlength')).toBeTruthy();
    });
  });

  describe('Accessibility — Live Regions', () => {
    it('should have an aria-live announcer', () => {
      const announcer = document.getElementById('sr-announcer');
      expect(announcer).toBeTruthy();
      expect(announcer.getAttribute('aria-live')).toBe('polite');
    });

    it('progress bar should have progressbar role', () => {
      const bar = document.getElementById('unicode-progress');
      expect(bar.getAttribute('role')).toBe('progressbar');
    });
  });

  describe('Accessibility — Decorative Elements', () => {
    it('background animation should be aria-hidden', () => {
      const bg = document.querySelector('.bg-animation');
      expect(bg.getAttribute('aria-hidden')).toBe('true');
    });

    it('emoji spans in header should be aria-hidden', () => {
      const emojiSpans = document.querySelectorAll('.logo-icon, .level-emoji');
      emojiSpans.forEach(span => {
        expect(span.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  describe('Accessibility — Document', () => {
    it('html should have lang attribute', () => {
      expect(document.documentElement.lang).toBeTruthy();
    });

    it('page should have exactly one h1', () => {
      const h1s = document.querySelectorAll('h1');
      expect(h1s.length).toBe(1);
    });
  });
}
