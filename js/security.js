/**
 * Security Module — Input sanitization and safe DOM rendering
 * @module security
 */

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
 * Escape HTML entities in a string to prevent XSS.
 * @param {string} str - Raw string
 * @returns {string} Escaped string safe for innerHTML
 */
export function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"'`/]/g, ch => ENTITY_MAP[ch]);
}

/**
 * Sanitize user text input — trim, limit length, strip HTML tags.
 * @param {string} input - Raw user input
 * @param {number} [maxLen=MAX_INPUT_LENGTH] - Maximum allowed length
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input, maxLen = MAX_INPUT_LENGTH) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '')       // strip HTML tags
    .replace(/[<>'"`;(){}]/g, '')  // strip dangerous characters
    .trim()
    .substring(0, maxLen);
}

/**
 * Sanitize a string for safe use in innerHTML where trusted HTML is needed.
 * Allows only a whitelist of safe tags.
 * @param {string} html - HTML string from trusted data source
 * @returns {string} Sanitized HTML
 */
export function sanitizeHTML(html) {
  if (typeof html !== 'string') return '';
  const ALLOWED_TAGS = ['strong', 'em', 'span', 'br', 'ul', 'ol', 'li', 'p', 'h2', 'h3', 'h4', 'div', 'button'];
  const ALLOWED_ATTRS = ['class', 'id', 'data-index', 'data-phase', 'style'];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function cleanNode(node) {
    if (node.nodeType === Node.TEXT_NODE) return;
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
      // Remove event handler attributes
      for (const attr of [...node.attributes]) {
        if (attr.name.toLowerCase().startsWith('on')) {
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
 * @param {string} text
 * @returns {Text}
 */
export function safeTextNode(text) {
  return document.createTextNode(typeof text === 'string' ? text : '');
}

/**
 * Validate that a value is a safe integer within bounds.
 * @param {*} val - Value to validate
 * @param {number} min - Minimum allowed
 * @param {number} max - Maximum allowed
 * @returns {boolean}
 */
export function isValidIndex(val, min, max) {
  const n = Number(val);
  return Number.isInteger(n) && n >= min && n <= max;
}
