/**
 * Security Module Tests
 */
import { describe, it, expect } from './test-runner.js';
import { escapeHTML, sanitizeInput, sanitizeHTML, isValidIndex } from '../js/security.js';

export function runSecurityTests() {
  describe('Security — escapeHTML', () => {
    it('should escape angle brackets', () => {
      expect(escapeHTML('<script>')).toBe('&lt;script&gt;');
    });

    it('should escape quotes', () => {
      expect(escapeHTML('"hello"')).toBe('&quot;hello&quot;');
    });

    it('should escape ampersands', () => {
      expect(escapeHTML('a & b')).toBe('a &amp; b');
    });

    it('should handle non-string input', () => {
      expect(escapeHTML(null)).toBe('');
      expect(escapeHTML(undefined)).toBe('');
      expect(escapeHTML(42)).toBe('');
    });

    it('should handle empty string', () => {
      expect(escapeHTML('')).toBe('');
    });
  });

  describe('Security — sanitizeInput', () => {
    it('should strip HTML tags', () => {
      expect(sanitizeInput('<b>hello</b>')).toBe('bhellob');
    });

    it('should limit input length', () => {
      const long = 'a'.repeat(300);
      const result = sanitizeInput(long);
      expect(result.length).toBeLessThanOrEqual(200);
    });

    it('should trim whitespace', () => {
      expect(sanitizeInput('  hello  ')).toBe('hello');
    });

    it('should block script injection', () => {
      const result = sanitizeInput('<script>alert("xss")</script>');
      expect(result).toNotContain('<script>');
      expect(result).toNotContain('alert');
    });

    it('should handle non-string input', () => {
      expect(sanitizeInput(null)).toBe('');
      expect(sanitizeInput(123)).toBe('');
    });
  });

  describe('Security — sanitizeHTML', () => {
    it('should allow safe tags', () => {
      const result = sanitizeHTML('<strong>bold</strong>');
      expect(result).toContain('<strong>');
    });

    it('should strip script tags', () => {
      const result = sanitizeHTML('<script>alert(1)</script>');
      expect(result).toNotContain('<script>');
    });

    it('should strip event handlers', () => {
      const result = sanitizeHTML('<div onclick="alert(1)">test</div>');
      expect(result).toNotContain('onclick');
    });
  });

  describe('Security — isValidIndex', () => {
    it('should validate integer in range', () => {
      expect(isValidIndex(2, 0, 5)).toBeTruthy();
    });

    it('should reject out of range', () => {
      expect(isValidIndex(10, 0, 5)).toBeFalsy();
    });

    it('should reject non-integer', () => {
      expect(isValidIndex('abc', 0, 5)).toBeFalsy();
      expect(isValidIndex(1.5, 0, 5)).toBeFalsy();
    });

    it('should accept boundary values', () => {
      expect(isValidIndex(0, 0, 5)).toBeTruthy();
      expect(isValidIndex(5, 0, 5)).toBeTruthy();
    });
  });
}
