/**
 * Navigation — Scroll, modal management, keyboard shortcuts, focus trapping
 * @module navigation
 */

/** @type {HTMLElement|null} Element that had focus before modal opened */
let _previousFocus = null;

/**
 * Scroll to a section by ID (if visible).
 * @param {string} sectionId - ID of the target section
 */
export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el && !el.classList.contains('hidden')) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Open a modal overlay by ID with proper focus management.
 * @param {string} modalId - ID of the modal element
 */
export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  _previousFocus = document.activeElement;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Move focus into the modal
  const focusTarget = modal.querySelector('.modal-close') || modal.querySelector('button');
  if (focusTarget) {
    requestAnimationFrame(() => focusTarget.focus());
  }

  // Set up focus trap
  modal.addEventListener('keydown', _trapFocus);
}

/**
 * Close a modal overlay by ID and restore focus.
 * @param {string} modalId - ID of the modal element
 */
export function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  modal.classList.add('hidden');
  document.body.style.overflow = '';
  modal.removeEventListener('keydown', _trapFocus);

  // Restore focus to previous element
  if (_previousFocus && typeof _previousFocus.focus === 'function') {
    _previousFocus.focus();
    _previousFocus = null;
  }
}

/**
 * Toggle visibility of a section.
 * @param {string} sectionId - ID of the section
 * @param {boolean} visible - Whether to show or hide
 */
export function toggleSection(sectionId, visible) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.classList.toggle('hidden', !visible);
  }
}

/**
 * Announce a message to screen readers via aria-live region.
 * @param {string} message - Text to announce
 */
export function announce(message) {
  const announcer = document.getElementById('sr-announcer');
  if (announcer) {
    announcer.textContent = '';
    requestAnimationFrame(() => {
      announcer.textContent = message;
    });
  }
}

/**
 * Initialize keyboard shortcuts.
 */
export function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal('phase-modal');
      closeModal('quiz-modal');
      const celebration = document.getElementById('celebration');
      if (celebration && !celebration.classList.contains('hidden')) {
        celebration.classList.add('hidden');
      }
      // Close language dropdown
      const langDropdown = document.getElementById('lang-dropdown');
      if (langDropdown && !langDropdown.classList.contains('hidden')) {
        langDropdown.classList.add('hidden');
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
          langToggle.setAttribute('aria-expanded', 'false');
          langToggle.focus();
        }
      }
    }
  });
}

/**
 * Trap focus inside a modal dialog.
 * @param {KeyboardEvent} e
 * @private
 */
function _trapFocus(e) {
  if (e.key !== 'Tab') return;

  const modal = e.currentTarget;
  const focusables = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusables.length === 0) return;

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}
