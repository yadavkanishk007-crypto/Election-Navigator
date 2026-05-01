/**
 * @file Google Analytics 4 — Externalized gtag initialization
 * @module gtag
 * @description Moves GA4 inline script to an external module for CSP compliance.
 *              This eliminates the need for 'unsafe-inline' in script-src CSP directive.
 * @author Kanishk Yadav
 */
'use strict';

/** @type {string} GA4 Measurement ID */
const GA4_ID = 'G-RTBHHRLEF7';

// Initialize dataLayer
window.dataLayer = window.dataLayer || [];

/**
 * Push arguments to the Google Analytics dataLayer.
 * @param {...*} args - GA4 arguments
 */
function gtag() {
  window.dataLayer.push(arguments);
}

// Make gtag globally accessible for the async GTM script
window.gtag = gtag;

// Initialize GA4 with privacy settings
gtag('js', new Date());
gtag('config', GA4_ID, {
  anonymize_ip: true,
  send_page_view: true,
  cookie_flags: 'SameSite=None;Secure'
});
