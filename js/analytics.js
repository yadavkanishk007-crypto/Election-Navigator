/**
 * Analytics Module — Google Analytics 4 event tracking
 * Privacy-respecting: no PII, honors Do Not Track.
 * @module analytics
 */

/** @type {boolean} Whether analytics is available */
let _enabled = false;

/**
 * Initialize Google Analytics. Call once on app start.
 * Respects the Do Not Track browser setting.
 */
export function initAnalytics() {
  // Respect Do Not Track
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
    _enabled = false;
    return;
  }
  _enabled = typeof window.gtag === 'function';
}

/**
 * Track a custom event.
 * @param {string} eventName - GA4 event name
 * @param {Object} [params={}] - Event parameters (no PII)
 */
export function trackEvent(eventName, params = {}) {
  if (!_enabled) return;
  try {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      ...params
    });
  } catch (e) {
    // Silently fail — analytics should never break the app
  }
}

/**
 * Track level selection.
 * @param {string} level
 */
export function trackLevelSelected(level) {
  trackEvent('level_selected', { level });
}

/**
 * Track phase completion.
 * @param {number} phase
 */
export function trackPhaseCompleted(phase) {
  trackEvent('phase_completed', { phase_number: phase });
}

/**
 * Track quiz result.
 * @param {number} phase
 * @param {boolean} passed
 * @param {number} score
 * @param {number} total
 */
export function trackQuizResult(phase, passed, score, total) {
  trackEvent('quiz_completed', {
    phase_number: phase,
    passed: passed,
    score: score,
    total: total,
    percentage: Math.round((score / total) * 100)
  });
}

/**
 * Track region selection.
 * @param {string} region
 */
export function trackRegionSelected(region) {
  trackEvent('region_selected', { region });
}

/**
 * Track language change.
 * @param {string} langCode
 */
export function trackLanguageChanged(langCode) {
  trackEvent('language_changed', { language: langCode });
}
