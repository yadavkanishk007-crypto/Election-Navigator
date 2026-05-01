/**
 * @file Security Module — Input sanitization, safe DOM rendering, and Trusted Types
 * @module security
 * @description Provides XSS prevention utilities including HTML escaping, input sanitization,
 *              a whitelist-based HTML sanitizer, and a Trusted Types policy for DOM sinks.
 * @author Kanishk Yadav
 * @version 2.0.0
 */
'use strict';

/** @type {number} Maximum allowed input length */
const MAX_INPUT_LENGTH = 200;

/** @type {Object} HTML entity map for escaping */
const ENTITY_MAP = Object.freeze({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#96;'
});

/**
 * Trusted Types Policy — Prevents DOM-based XSS by ensuring only sanitized
 * HTML can be assigned to innerHTML and other DOM sinks.
 * @type {TrustedTypePolicy|null}
 */
let _trustedPolicy = null;

try {
  if (typeof window !== 'undefined' && window.trustedTypes && window.trustedTypes.createPolicy) {
    _trustedPolicy = window.trustedTypes.createPolicy('election-navigator', {
      createHTML: (input) => sanitizeHTML(input),
      createScriptURL: (input) => {
        const allowed = [
          'https://www.googletagmanager.com/',
          'https://www.google-analytics.com/'
        ];
        if (allowed.some(url => input.startsWith(url))) {
          return input;
        }
        throw new TypeError(`Blocked untrusted script URL: ${input}`);
      }
    });
  }
} catch (e) {
  // Trusted Types not supported — fallback to manual sanitization
}

/**
 * Get the Trusted Types policy (if available).
 * @returns {TrustedTypePolicy|null} The policy or null if not supported
 */
export function getTrustedPolicy() {
  return _trustedPolicy;
}

/**
 * Create a TrustedHTML value from a string (falls back to raw string if TT not supported).
 * @param {string} html - HTML string to trust
 * @returns {TrustedHTML|string} Trusted HTML value
 */
export function createTrustedHTML(html) {
  if (_trustedPolicy) {
    return _trustedPolicy.createHTML(html);
  }
  return sanitizeHTML(html);
}

/**
 * Escape HTML entities in a string to prevent XSS.
 * @param {string} str - Raw string
 * @returns {string} Escaped string safe for innerHTML
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') { return ''; }
  return str.replace(/[&<>"'`/]/g, (ch) => ENTITY_MAP[ch]);
}

/**
 * Sanitize user text input — trim, limit length, strip HTML tags and dangerous characters.
 * @param {string} input - Raw user input
 * @param {number} [maxLen=MAX_INPUT_LENGTH] - Maximum allowed length
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input, maxLen = MAX_INPUT_LENGTH) {
  if (typeof input !== 'string') { return ''; }
  return input
    .replace(/<[^>]*>/g, '')         // strip HTML tags
    .replace(/[<>'"`;\\/(){}[\]]/g, '') // strip dangerous characters including brackets
    .trim()
    .substring(0, maxLen);
}

/**
 * Sanitize a string for safe use in innerHTML where trusted HTML is needed.
 * Allows only a whitelist of safe tags and attributes.
 * @param {string} html - HTML string from trusted data source
 * @returns {string} Sanitized HTML with only allowed tags/attributes
 */
export function sanitizeHTML(html) {
  if (typeof html !== 'string') { return ''; }
  const ALLOWED_TAGS = ['strong', 'em', 'span', 'br', 'ul', 'ol', 'li', 'p', 'h2', 'h3', 'h4', 'div', 'button'];
  const ALLOWED_ATTRS = ['class', 'id', 'data-index', 'data-phase', 'style', 'aria-label', 'role'];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  /**
   * Recursively clean a DOM node tree.
   * @param {Node} node - DOM node to clean
   */
  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) { return; }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      if (!ALLOWED_TAGS.includes(tag)) {
        node.replaceWith(...node.childNodes);
        return;
      }
      // Remove disallowed attributes
      for (const attr of [...node.attributes]) {
        if (!ALLOWED_ATTRS.includes(attr.name.toLowerCase())) {
          node.removeAttribute(attr.name);
        }
      }
      // Remove event handler attributes (on*)
      for (const attr of [...node.attributes]) {
        if (attr.name.toLowerCase().startsWith('on')) {
          node.removeAttribute(attr.name);
        }
      }
      // Remove javascript: URLs in any remaining attributes
      for (const attr of [...node.attributes]) {
        if (typeof attr.value === 'string' && attr.value.toLowerCase().includes('javascript:')) {
          node.removeAttribute(attr.name);
        }
      }
    }
    for (const child of [...node.childNodes]) {
      cleanNode(child);
    }
  }

  cleanNode(doc.body);
  return doc.body.innerHTML;
}

/**
 * Create a text node safely — no HTML interpretation.
 * @param {string} text - Text content
 * @returns {Text} Safe text node
 */
export function safeTextNode(text) {
  return document.createTextNode(typeof text === 'string' ? text : '');
}

/**
 * Validate that a value is a safe integer within bounds.
 * @param {*} val - Value to validate
 * @param {number} min - Minimum allowed (inclusive)
 * @param {number} max - Maximum allowed (inclusive)
 * @returns {boolean} True if val is an integer within [min, max]
 */
export function isValidIndex(val, min, max) {
  const n = Number(val);
  return Number.isInteger(n) && n >= min && n <= max;
}
