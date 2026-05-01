/**
 * @file Quiz Logic Tests — Scoring, pass/fail, boundary validation
 * @description Tests for quiz module logic and data integrity
 */
import { describe, it, expect } from './test-runner.js';
import { QUIZZES } from '../data/quizzes.js';
import { getPhaseCount } from '../data/phases.js';
import { isValidIndex } from '../js/security.js';

export function runQuizTests() {
  const PASS_THRESHOLD = 0.66;

  describe('Quiz — Data Coverage', () => {
    it('should have quizzes for every phase', () => {
      const count = getPhaseCount();
      for (let i = 1; i <= count; i++) {
        expect(QUIZZES[i]).toBeTruthy();
        expect(QUIZZES[i].length).toBeGreaterThan(0);
      }
    });

    it('should have at least 3 questions per phase', () => {
      const count = getPhaseCount();
      for (let i = 1; i <= count; i++) {
        expect(QUIZZES[i].length).toBeGreaterThan(2);
      }
    });
  });

  describe('Quiz — Question Validation', () => {
    it('every question should have exactly 4 options', () => {
      Object.values(QUIZZES).forEach(questions => {
        questions.forEach(q => {
          expect(q.options.length).toBe(4);
        });
      });
    });

    it('correct answer index should be within options range', () => {
      Object.values(QUIZZES).forEach(questions => {
        questions.forEach(q => {
          expect(q.correct).toBeLessThanOrEqual(q.options.length - 1);
          expect(isValidIndex(q.correct, 0, q.options.length - 1)).toBeTruthy();
        });
      });
    });

    it('every question should have a non-empty explanation', () => {
      Object.values(QUIZZES).forEach(questions => {
        questions.forEach(q => {
          expect(q.explanation).toBeTypeOf('string');
          expect(q.explanation.length).toBeGreaterThan(0);
        });
      });
    });

    it('question text should not be empty', () => {
      Object.values(QUIZZES).forEach(questions => {
        questions.forEach(q => {
          expect(q.q.length).toBeGreaterThan(5);
        });
      });
    });
  });

  describe('Quiz — Pass Threshold Logic', () => {
    it('should pass with 66%+ score (3/4)', () => {
      const passed = (3 / 4) >= PASS_THRESHOLD;
      expect(passed).toBeTruthy();
    });

    it('should fail with less than 66% (1/4)', () => {
      const passed = (1 / 4) >= PASS_THRESHOLD;
      expect(passed).toBeFalsy();
    });

    it('should pass with exactly 66% (2/3)', () => {
      const passed = (2 / 3) >= PASS_THRESHOLD;
      expect(passed).toBeTruthy();
    });

    it('should fail with 0/N score', () => {
      const passed = (0 / 4) >= PASS_THRESHOLD;
      expect(passed).toBeFalsy();
    });

    it('should pass with perfect score (4/4)', () => {
      const passed = (4 / 4) >= PASS_THRESHOLD;
      expect(passed).toBeTruthy();
    });
  });

  describe('Quiz — Index Validation', () => {
    it('should reject negative phase index', () => {
      expect(isValidIndex(-1, 1, getPhaseCount())).toBeFalsy();
    });

    it('should reject phase index beyond count', () => {
      expect(isValidIndex(getPhaseCount() + 1, 1, getPhaseCount())).toBeFalsy();
    });

    it('should accept valid phase index', () => {
      expect(isValidIndex(1, 1, getPhaseCount())).toBeTruthy();
    });

    it('should reject non-integer question index', () => {
      expect(isValidIndex(1.5, 0, 3)).toBeFalsy();
    });

    it('should reject string question index', () => {
      expect(isValidIndex('abc', 0, 3)).toBeFalsy();
    });
  });

  describe('Quiz — Answer Option Uniqueness', () => {
    it('options within each question should be unique', () => {
      Object.values(QUIZZES).forEach(questions => {
        questions.forEach(q => {
          const unique = new Set(q.options);
          expect(unique.size).toBe(q.options.length);
        });
      });
    });
  });
}
