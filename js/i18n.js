/**
 * i18n Module — Language management with reactive updates
 * @module i18n
 */
import { TRANSLATIONS, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/i18n.js';

/** @type {string} Current active language code */
let _currentLang = DEFAULT_LANGUAGE;

/** @type {Function[]} Subscribers notified on language change */
const _listeners = [];

/**
 * Get a translated string by dot-notation key.
 * Supports template interpolation: {phase}, {score}, {total}, {pct}, {current}
 * @param {string} key - Dot-notation key, e.g. 'hero.title'
 * @param {Object} [vars={}] - Template variables
 * @returns {string} Translated string or key if not found
 */
export function t(key, vars = {}) {
  const keys = key.split('.');
  let val = TRANSLATIONS[_currentLang];
  for (const k of keys) {
    if (val == null) return key;
    val = val[k];
  }
  if (typeof val !== 'string') return key;
  return val.replace(/\{(\w+)\}/g, (_, name) =>
    vars[name] !== undefined ? String(vars[name]) : `{${name}}`
  );
}

/**
 * Set the active language and notify all subscribers.
 * @param {string} langCode - Language code (en, hi, ta, te, bn)
 */
export function setLanguage(langCode) {
  if (!TRANSLATIONS[langCode]) return;
  _currentLang = langCode;
  document.documentElement.lang = langCode;
  document.documentElement.dir = TRANSLATIONS[langCode].meta.dir;
  try { localStorage.setItem('election-nav-lang', langCode); } catch (e) { /* private browsing */ }
  _listeners.forEach(fn => fn(langCode));
}

/**
 * Get the current language code.
 * @returns {string}
 */
export function getLanguage() {
  return _currentLang;
}

/**
 * Subscribe to language changes.
 * @param {Function} callback
 */
export function onLanguageChange(callback) {
  _listeners.push(callback);
}

/**
 * Get list of supported languages.
 * @returns {Array<{code: string, name: string}>}
 */
export function getSupportedLanguages() {
  return SUPPORTED_LANGUAGES;
}

/**
 * Initialize i18n — restore saved language preference.
 */
export function initI18n() {
  try {
    const saved = localStorage.getItem('election-nav-lang');
    if (saved && TRANSLATIONS[saved]) {
      _currentLang = saved;
      document.documentElement.lang = saved;
      document.documentElement.dir = TRANSLATIONS[saved].meta.dir;
    }
  } catch (e) { /* private browsing */ }
}
