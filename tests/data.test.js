/**
 * Data Integrity Tests
 */
import { describe, it, expect } from './test-runner.js';
import { PHASES, getPhaseCount } from '../data/phases.js';
import { QUIZZES } from '../data/quizzes.js';
import { DEFAULT_TIMELINE, REGION_TIMELINES, getTimeline } from '../data/timelines.js';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/i18n.js';

export function runDataTests() {
  describe('Data — Phases', () => {
    it('should have at least 1 phase', () => {
      expect(getPhaseCount()).toBeGreaterThan(0);
    });

    it('every phase should have required fields', () => {
      const count = getPhaseCount();
      for (let i = 1; i <= count; i++) {
        expect(PHASES[i]).toBeTruthy();
        expect(PHASES[i].title).toBeTypeOf('string');
        expect(PHASES[i].icon).toBeTypeOf('string');
        expect(PHASES[i].sections.length).toBeGreaterThan(0);
      }
    });

    it('every section should have heading and text', () => {
      const count = getPhaseCount();
      for (let i = 1; i <= count; i++) {
        PHASES[i].sections.forEach(s => {
          expect(s.heading).toBeTypeOf('string');
          expect(s.text).toBeTypeOf('string');
        });
      }
    });
  });

  describe('Data — Quizzes', () => {
    it('every phase should have matching quiz questions', () => {
      const count = getPhaseCount();
      for (let i = 1; i <= count; i++) {
        expect(QUIZZES[i]).toBeTruthy();
        expect(QUIZZES[i].length).toBeGreaterThan(0);
      }
    });

    it('every question should have valid structure', () => {
      Object.values(QUIZZES).forEach(questions => {
        questions.forEach(q => {
          expect(q.q).toBeTypeOf('string');
          expect(q.options.length).toBeGreaterThan(1);
          expect(q.correct).toBeTypeOf('number');
          expect(q.explanation).toBeTypeOf('string');
          expect(q.correct).toBeLessThanOrEqual(q.options.length - 1);
        });
      });
    });
  });

  describe('Data — Timelines', () => {
    it('default timeline should have items', () => {
      expect(DEFAULT_TIMELINE.length).toBeGreaterThan(0);
    });

    it('getTimeline should return default for null region', () => {
      const { items } = getTimeline(null);
      expect(items.length).toBeGreaterThan(0);
    });

    it('getTimeline should return region-specific for known region', () => {
      const { items, label } = getTimeline('united states');
      expect(items.length).toBeGreaterThan(0);
      expect(label).toContain('United States');
    });

    it('getTimeline should fallback for unknown region', () => {
      const { items } = getTimeline('narnia');
      expect(items.length).toBeGreaterThan(0);
    });

    it('every timeline item should have title, date, desc', () => {
      DEFAULT_TIMELINE.forEach(item => {
        expect(item.title).toBeTypeOf('string');
        expect(item.date).toBeTypeOf('string');
        expect(item.desc).toBeTypeOf('string');
      });
    });
  });

  describe('Data — i18n Translations', () => {
    it('should have at least 3 languages', () => {
      expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(2);
    });

    it('every language should have all required keys', () => {
      const requiredKeys = ['header', 'hero', 'region', 'progress', 'phases', 'timeline', 'quickActions', 'modal', 'quiz', 'celebration', 'footer'];
      Object.entries(TRANSLATIONS).forEach(([code, lang]) => {
        requiredKeys.forEach(key => {
          expect(lang[key]).toBeTruthy();
        });
      });
    });

    it('every language should have meta with name and dir', () => {
      Object.values(TRANSLATIONS).forEach(lang => {
        expect(lang.meta.name).toBeTypeOf('string');
        expect(lang.meta.dir).toBeTypeOf('string');
      });
    });
  });
}
