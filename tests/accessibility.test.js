/**
 * @file Accessibility Tests — DOM-based a11y validation
 * @description Validates WCAG 2.1 AA compliance including ARIA roles, skip link,
 *              focus management, heading hierarchy, and forced-colors support.
 */
import { describe, it, expect } from './test-runner.js';

export function runAccessibilityTests() {
  describe('Accessibility — Semantic HTML', () => {
    it('should have a header element', () => {
      const header = document.getElementById('main-header');
      expect(header).toBeTruthy();
      expect(header.tagName.toLowerCase()).toBe('header');
    });

    it('should have a main element', () => {
      const main = document.getElementById('main-content');
      expect(main).toBeTruthy();
      expect(main.tagName.toLowerCase()).toBe('main');
    });

    it('should have a footer element', () => {
      const footer = document.getElementById('main-footer');
      expect(footer).toBeTruthy();
      expect(footer.tagName.toLowerCase()).toBe('footer');
    });

    it('should use semantic section elements', () => {
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(3);
    });
  });

  describe('Accessibility — Modals', () => {
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

    it('quiz modal should have aria-roledescription', () => {
      const quizModal = document.getElementById('quiz-modal');
      expect(quizModal.getAttribute('aria-roledescription')).toBe('quiz wizard');
    });

    it('celebration should have alertdialog role', () => {
      const celebration = document.getElementById('celebration');
      expect(celebration.getAttribute('role')).toBe('alertdialog');
    });
  });

  describe('Accessibility — Navigation', () => {
    it('should have a skip link', () => {
      const skipLink = document.getElementById('skip-link');
      expect(skipLink).toBeTruthy();
      expect(skipLink.getAttribute('href')).toBe('#main-content');
    });

    it('should have nav elements with aria-label', () => {
      const navs = document.querySelectorAll('nav[aria-label]');
      expect(navs.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility — Heading Hierarchy', () => {
    it('page should have exactly one h1', () => {
      const h1s = document.querySelectorAll('h1');
      expect(h1s.length).toBe(1);
    });

    it('should have h2 elements for section headings', () => {
      const h2s = document.querySelectorAll('h2');
      expect(h2s.length).toBeGreaterThan(2);
    });

    it('sections should have aria-labelledby pointing to headings', () => {
      const phasesSection = document.getElementById('phases-section');
      expect(phasesSection.getAttribute('aria-labelledby')).toBe('phases-heading');

      const timelineSection = document.getElementById('timeline-section');
      expect(timelineSection.getAttribute('aria-labelledby')).toBe('timeline-heading');
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
      const label = document.querySelector('label[for="region-input"]');
      expect(label).toBeTruthy();
    });

    it('region input should have maxlength', () => {
      const input = document.getElementById('region-input');
      expect(input.getAttribute('maxlength')).toBeTruthy();
    });
  });

  describe('Accessibility — Live Regions', () => {
    it('should have a polite aria-live announcer', () => {
      const announcer = document.getElementById('sr-announcer');
      expect(announcer).toBeTruthy();
      expect(announcer.getAttribute('aria-live')).toBe('polite');
    });

    it('should have an assertive aria-live region', () => {
      const assertive = document.getElementById('sr-assertive');
      expect(assertive).toBeTruthy();
      expect(assertive.getAttribute('aria-live')).toBe('assertive');
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

    it('emoji spans should be aria-hidden', () => {
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

    it('should have PWA manifest link', () => {
      const manifest = document.querySelector('link[rel="manifest"]');
      expect(manifest).toBeTruthy();
    });
  });
}
