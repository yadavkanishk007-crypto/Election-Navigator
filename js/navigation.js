/**
 * Navigation — Scroll, modal management, keyboard shortcuts
 */

/**
 * Scroll to a section by ID (if visible).
 * @param {string} sectionId
 */
export function scrollToSection(sectionId) {
  const el = document.getElementById(sectionId);
  if (el && !el.classList.contains('hidden')) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Open a modal overlay by ID.
 * @param {string} modalId
 */
export function openModal(modalId) {
  document.getElementById(modalId).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/**
 * Close a modal overlay by ID.
 * @param {string} modalId
 */
export function closeModal(modalId) {
  document.getElementById(modalId).classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * Toggle visibility of a section.
 * @param {string} sectionId
 * @param {boolean} visible
 */
export function toggleSection(sectionId, visible) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.classList.toggle('hidden', !visible);
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
    }
  });
}
