/**
 * @file Renderer Tests — DOM rendering validation
 */
import { describe, it, expect } from './test-runner.js';

export function runRendererTests() {
  describe('Renderer — Phase Cards Grid', () => {
    it('phases-grid should exist with role="list"', () => {
      const grid = document.getElementById('phases-grid');
      expect(grid).toBeTruthy();
      expect(grid.getAttribute('role')).toBe('list');
    });

    it('phases-grid should have aria-label', () => {
      const grid = document.getElementById('phases-grid');
      expect(grid.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Renderer — Progress Track', () => {
    it('progress bar should have correct ARIA attributes', () => {
      const bar = document.getElementById('unicode-progress');
      expect(bar).toBeTruthy();
      expect(bar.getAttribute('role')).toBe('progressbar');
      expect(bar.getAttribute('aria-valuemin')).toBe('0');
      expect(bar.getAttribute('aria-valuemax')).toBe('100');
    });

    it('progress-track should have role="list"', () => {
      const track = document.getElementById('progress-track');
      expect(track.getAttribute('role')).toBe('list');
    });
  });

  describe('Renderer — Timeline', () => {
    it('timeline-container should exist with role="list"', () => {
      const c = document.getElementById('timeline-container');
      expect(c).toBeTruthy();
      expect(c.getAttribute('role')).toBe('list');
    });
  });

  describe('Renderer — i18n Integration', () => {
    it('should have 10+ data-i18n attributes', () => {
      const els = document.querySelectorAll('[data-i18n]');
      expect(els.length).toBeGreaterThan(10);
    });

    it('region input should have data-i18n-placeholder', () => {
      const input = document.getElementById('region-input');
      expect(input.getAttribute('data-i18n-placeholder')).toBeTruthy();
    });
  });

  describe('Renderer — Modal Bodies', () => {
    it('modal-body and quiz-body should exist', () => {
      expect(document.getElementById('modal-body')).toBeTruthy();
      expect(document.getElementById('quiz-body')).toBeTruthy();
    });

    it('phase modal should reference title via aria-labelledby', () => {
      const m = document.getElementById('phase-modal');
      expect(m.getAttribute('aria-labelledby')).toBe('phase-modal-title');
    });
  });

  describe('Renderer — Section Structure', () => {
    it('should have exactly one h1', () => {
      expect(document.querySelectorAll('h1').length).toBe(1);
    });

    it('should have h2 elements for heading hierarchy', () => {
      expect(document.querySelectorAll('h2').length).toBeGreaterThan(0);
    });

    it('all major sections should have aria-labelledby', () => {
      ['hero', 'region-section', 'progress-section', 'phases-section', 'timeline-section'].forEach(id => {
        const s = document.getElementById(id);
        if (s) { expect(s.getAttribute('aria-labelledby')).toBeTruthy(); }
      });
    });
  });

  describe('Renderer — Celebration', () => {
    it('should have alertdialog role and be hidden', () => {
      const c = document.getElementById('celebration');
      expect(c).toBeTruthy();
      expect(c.classList.contains('hidden')).toBeTruthy();
      expect(c.getAttribute('role')).toBe('alertdialog');
      expect(c.getAttribute('aria-labelledby')).toBe('celebration-title');
    });
  });
}
