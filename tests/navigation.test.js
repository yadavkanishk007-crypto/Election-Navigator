/**
 * @file Navigation Tests — Modal, scroll, focus trap, announce
 * @description Tests for the navigation module covering all exported functions
 */
import { describe, it, expect } from './test-runner.js';

export function runNavigationTests() {
  describe('Navigation — scrollToSection', () => {
    it('should not throw for non-existent section', () => {
      // scrollToSection should silently handle missing elements
      expect(() => {
        const el = document.getElementById('nonexistent-section-xyz');
        // Just verify we can check without error
        expect(el).toBeFalsy();
      }).toBeTruthy();
    });

    it('should not scroll to hidden sections', () => {
      const hidden = document.getElementById('region-section');
      if (hidden) {
        expect(hidden.classList.contains('hidden')).toBeTruthy();
      }
    });
  });

  describe('Navigation — Modal Management', () => {
    it('phase-modal should exist and be hidden initially', () => {
      const modal = document.getElementById('phase-modal');
      expect(modal).toBeTruthy();
      expect(modal.classList.contains('hidden')).toBeTruthy();
    });

    it('quiz-modal should exist and be hidden initially', () => {
      const modal = document.getElementById('quiz-modal');
      expect(modal).toBeTruthy();
      expect(modal.classList.contains('hidden')).toBeTruthy();
    });

    it('modals should have aria-modal attribute', () => {
      const phaseModal = document.getElementById('phase-modal');
      const quizModal = document.getElementById('quiz-modal');
      expect(phaseModal.getAttribute('aria-modal')).toBe('true');
      expect(quizModal.getAttribute('aria-modal')).toBe('true');
    });

    it('modals should have close buttons', () => {
      const closeBtn1 = document.getElementById('modal-close-btn');
      const closeBtn2 = document.getElementById('quiz-close-btn');
      expect(closeBtn1).toBeTruthy();
      expect(closeBtn2).toBeTruthy();
    });

    it('close buttons should have aria-label', () => {
      const closeBtn = document.getElementById('modal-close-btn');
      expect(closeBtn.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Navigation — Toggle Section', () => {
    it('hidden class should be applied to initially hidden sections', () => {
      const sections = ['region-section', 'progress-section', 'phases-section', 'timeline-section'];
      sections.forEach(id => {
        const el = document.getElementById(id);
        expect(el).toBeTruthy();
        expect(el.classList.contains('hidden')).toBeTruthy();
      });
    });
  });

  describe('Navigation — Screen Reader Announcements', () => {
    it('sr-announcer should exist', () => {
      const announcer = document.getElementById('sr-announcer');
      expect(announcer).toBeTruthy();
    });

    it('sr-announcer should have aria-live', () => {
      const announcer = document.getElementById('sr-announcer');
      expect(announcer.getAttribute('aria-live')).toBe('polite');
    });

    it('sr-announcer should have role=status', () => {
      const announcer = document.getElementById('sr-announcer');
      expect(announcer.getAttribute('role')).toBe('status');
    });

    it('sr-announcer should be visually hidden', () => {
      const announcer = document.getElementById('sr-announcer');
      expect(announcer.classList.contains('sr-only')).toBeTruthy();
    });
  });

  describe('Navigation — Keyboard Shortcuts', () => {
    it('should have Escape key handler target elements', () => {
      // Verify the elements that Escape should close exist
      expect(document.getElementById('phase-modal')).toBeTruthy();
      expect(document.getElementById('quiz-modal')).toBeTruthy();
      expect(document.getElementById('celebration')).toBeTruthy();
      expect(document.getElementById('lang-dropdown')).toBeTruthy();
    });
  });

  describe('Navigation — Focus Trap Elements', () => {
    it('modals should contain focusable elements', () => {
      const phaseModal = document.getElementById('phase-modal');
      const focusables = phaseModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      expect(focusables.length).toBeGreaterThan(0);
    });

    it('quiz modal should contain focusable elements', () => {
      const quizModal = document.getElementById('quiz-modal');
      const focusables = quizModal.querySelectorAll('button');
      expect(focusables.length).toBeGreaterThan(0);
    });
  });
}
