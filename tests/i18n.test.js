/**
 * @file i18n Tests — Translation, language switching, template variables
 * @description Tests for internationalization module and translation data
 */
import { describe, it, expect } from './test-runner.js';
import { TRANSLATIONS, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/i18n.js';
import { t, getLanguage, getSupportedLanguages } from '../js/i18n.js';

export function runI18nTests() {
  describe('i18n — Supported Languages', () => {
    it('should have at least 5 supported languages', () => {
      expect(SUPPORTED_LANGUAGES.length).toBeGreaterThan(4);
    });

    it('should include English as default', () => {
      expect(DEFAULT_LANGUAGE).toBe('en');
    });

    it('every language should have a code and name', () => {
      SUPPORTED_LANGUAGES.forEach(lang => {
        expect(lang.code).toBeTypeOf('string');
        expect(lang.name).toBeTypeOf('string');
        expect(lang.code.length).toBeGreaterThan(0);
        expect(lang.name.length).toBeGreaterThan(0);
      });
    });

    it('getSupportedLanguages should match SUPPORTED_LANGUAGES', () => {
      const result = getSupportedLanguages();
      expect(result.length).toBe(SUPPORTED_LANGUAGES.length);
    });
  });

  describe('i18n — Translation Completeness', () => {
    const requiredSections = ['header', 'hero', 'region', 'progress', 'phases', 'timeline', 'quickActions', 'modal', 'quiz', 'celebration', 'footer'];

    it('every language should have all required sections', () => {
      Object.entries(TRANSLATIONS).forEach(([code, lang]) => {
        requiredSections.forEach(section => {
          expect(lang[section]).toBeTruthy();
        });
      });
    });

    it('every language should have meta with name and dir', () => {
      Object.values(TRANSLATIONS).forEach(lang => {
        expect(lang.meta).toBeTruthy();
        expect(lang.meta.name).toBeTypeOf('string');
        expect(lang.meta.dir).toBeTypeOf('string');
      });
    });

    it('dir should be either ltr or rtl', () => {
      Object.values(TRANSLATIONS).forEach(lang => {
        const validDirs = ['ltr', 'rtl'];
        expect(validDirs).toContain(lang.meta.dir);
      });
    });

    it('English should have all quiz keys', () => {
      const quizKeys = ['header', 'title', 'correct', 'wrong', 'next', 'seeResults', 'resultPass', 'resultFail', 'completePhase', 'retry', 'review', 'scoreLabel'];
      quizKeys.forEach(key => {
        expect(TRANSLATIONS.en.quiz[key]).toBeTypeOf('string');
      });
    });

    it('non-English languages should have matching quiz keys', () => {
      const enKeys = Object.keys(TRANSLATIONS.en.quiz);
      Object.entries(TRANSLATIONS).forEach(([code, lang]) => {
        if (code === 'en') { return; }
        enKeys.forEach(key => {
          expect(lang.quiz[key]).toBeTruthy();
        });
      });
    });
  });

  describe('i18n — Translation Function t()', () => {
    it('should return translated string for valid key', () => {
      const result = t('hero.beginner');
      expect(result).toBeTypeOf('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return key itself for missing key', () => {
      const result = t('nonexistent.key.xyz');
      expect(result).toBe('nonexistent.key.xyz');
    });

    it('should support template variable interpolation', () => {
      const result = t('quiz.scoreLabel', { score: 3, total: 4, pct: 75 });
      expect(result).toContain('3');
      expect(result).toContain('4');
      expect(result).toContain('75');
    });

    it('should handle empty key gracefully', () => {
      const result = t('');
      expect(result).toBe('');
    });

    it('should handle nested keys correctly', () => {
      const result = t('header.phases');
      expect(result).toBeTypeOf('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('i18n — Language State', () => {
    it('getLanguage should return a string', () => {
      const lang = getLanguage();
      expect(lang).toBeTypeOf('string');
    });

    it('current language should be in supported list', () => {
      const current = getLanguage();
      const codes = SUPPORTED_LANGUAGES.map(l => l.code);
      expect(codes).toContain(current);
    });
  });

  describe('i18n — Data Immutability', () => {
    it('TRANSLATIONS should be frozen', () => {
      expect(Object.isFrozen(TRANSLATIONS)).toBeTruthy();
    });

    it('SUPPORTED_LANGUAGES should be frozen', () => {
      expect(Object.isFrozen(SUPPORTED_LANGUAGES)).toBeTruthy();
    });
  });
}
