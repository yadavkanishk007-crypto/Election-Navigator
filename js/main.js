/**
 * @file Main Entry Point — Wires everything together
 * @module main
 * @description Imports all modules, registers the service worker, attaches event
 *              listeners, builds the language dropdown, and initializes the app.
 * @author Kanishk Yadav
 * @version 2.0.0
 */
'use strict';

import * as State from './state.js';
import * as Nav from './navigation.js';
import * as Renderer from './renderer.js';
import * as Quiz from './quiz.js';
import { getPhaseCount } from '../data/phases.js';
import { initI18n, setLanguage, getLanguage, getSupportedLanguages, onLanguageChange, t } from './i18n.js';
import { sanitizeInput } from './security.js';
import { initAnalytics, trackLevelSelected, trackRegionSelected, trackLanguageChanged } from './analytics.js';

// ===== EXPOSE TO GLOBAL (for inline onclick from renderer) =====
window.openPhase = openPhase;

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((reg) => {
        console.log('[SW] Registered:', reg.scope);
      })
      .catch((err) => {
        // Service worker registration failure is non-fatal
        console.warn('[SW] Registration failed:', err.message);
      });
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initAnalytics();
  Nav.initKeyboardShortcuts();
  wireUpEventListeners();
  buildLanguageDropdown();
  Renderer.applyTranslations();

  // React to language changes
  onLanguageChange(() => {
    Renderer.applyTranslations();
    // Re-render dynamic content if already visible
    const phasesSection = document.getElementById('phases-section');
    if (phasesSection && !phasesSection.classList.contains('hidden')) {
      Renderer.renderPhaseCards();
      Renderer.updateProgressDisplay();
      Renderer.renderTimeline(State.getUserRegion());
    }
  });
});

// ===== LANGUAGE DROPDOWN =====
/**
 * Build the language selector dropdown with all supported languages.
 * @returns {void}
 */
function buildLanguageDropdown() {
  const dropdown = document.getElementById('lang-dropdown');
  const toggle = document.getElementById('lang-toggle');
  const currentLabel = document.getElementById('lang-current');
  if (!dropdown || !toggle) { return; }

  const languages = getSupportedLanguages();
  const currentLang = getLanguage();

  dropdown.innerHTML = '';
  languages.forEach((lang) => {
    const li = document.createElement('li');
    li.textContent = lang.name;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', lang.code === currentLang ? 'true' : 'false');
    li.setAttribute('data-lang', lang.code);
    li.addEventListener('click', () => {
      setLanguage(lang.code);
      trackLanguageChanged(lang.code);
      if (currentLabel) { currentLabel.textContent = lang.code.toUpperCase(); }
      dropdown.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');

      // Update aria-selected
      dropdown.querySelectorAll('li').forEach((item) => {
        item.setAttribute('aria-selected', item.dataset.lang === lang.code ? 'true' : 'false');
      });
    });
    dropdown.appendChild(li);
  });

  if (currentLabel) { currentLabel.textContent = currentLang.toUpperCase(); }

  // Toggle dropdown
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !dropdown.classList.contains('hidden');
    dropdown.classList.toggle('hidden');
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close on outside click
  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
  });
}

// ===== EVENT WIRING =====
/**
 * Wire up all event listeners for user interactions.
 * @returns {void}
 */
function wireUpEventListeners() {
  // Level selector
  document.querySelectorAll('.level-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectLevel(btn.dataset.level);
    });
  });

  // Region submit
  document.getElementById('region-submit')?.addEventListener('click', submitRegion);

  // Region skip
  document.getElementById('region-skip')?.addEventListener('click', skipRegion);

  // Region input — enter key
  const regionInput = document.getElementById('region-input');
  if (regionInput) {
    regionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { submitRegion(); }
    });
  }

  // Modal close buttons
  document.getElementById('modal-close-btn')?.addEventListener('click', () => Nav.closeModal('phase-modal'));
  document.getElementById('quiz-close-btn')?.addEventListener('click', () => Quiz.closeQuiz());

  // Phase modal quiz button
  document.getElementById('modal-quiz-btn')?.addEventListener('click', () => {
    Nav.closeModal('phase-modal');
    Quiz.startQuiz(State.getQuizPhase());
  });

  // Quick action buttons
  document.getElementById('qa-learn')?.addEventListener('click', () => openPhase(State.getCurrentPhase()));
  document.getElementById('qa-timeline')?.addEventListener('click', () => Nav.scrollToSection('timeline-section'));
  document.getElementById('qa-quiz')?.addEventListener('click', () => Quiz.openQuiz());
  document.getElementById('qa-home')?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Celebration close
  document.getElementById('celebration-close-btn')?.addEventListener('click', () => {
    document.getElementById('celebration')?.classList.add('hidden');
  });

  // Footer nav buttons (proper buttons with data-nav)
  document.querySelectorAll('.footer-nav-btn[data-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nav = btn.dataset.nav;
      if (nav === 'phases') { Nav.scrollToSection('phases-section'); }
      else if (nav === 'timeline') { Nav.scrollToSection('timeline-section'); }
      else if (nav === 'quiz') { Quiz.openQuiz(); }
      else if (nav === 'home') { scrollTo({ top: 0, behavior: 'smooth' }); }
    });
  });

  // Header nav buttons
  document.getElementById('nav-phases')?.addEventListener('click', () => Nav.scrollToSection('phases-section'));
  document.getElementById('nav-timeline')?.addEventListener('click', () => Nav.scrollToSection('timeline-section'));
  document.getElementById('nav-quiz')?.addEventListener('click', () => Quiz.openQuiz());

  // State subscriptions
  State.subscribe('progressUpdated', () => Renderer.updateProgressDisplay());
}

// ===== ACTIONS =====

/**
 * Handle level selection — update state, animate transition, show region section.
 * @param {string} level - Selected level ('beginner', 'intermediate', 'expert')
 * @returns {void}
 */
function selectLevel(level) {
  State.setUserLevel(level);
  trackLevelSelected(level);
  document.querySelectorAll('.level-btn').forEach((b) => b.classList.remove('selected'));
  document.querySelector(`[data-level="${level}"]`)?.classList.add('selected');
  Nav.announce(`${level} level selected.`);

  setTimeout(() => {
    Nav.toggleSection('region-section', true);
    document.getElementById('region-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('region-input')?.focus();
  }, 400);
}

/**
 * Submit the region input and load tailored content.
 * @returns {void}
 */
function submitRegion() {
  const raw = document.getElementById('region-input')?.value || '';
  const input = sanitizeInput(raw);
  if (!input) { return; }
  State.setUserRegion(input.toLowerCase());
  trackRegionSelected(input.toLowerCase());
  showMainContent();
}

/**
 * Skip region selection and load default content.
 * @returns {void}
 */
function skipRegion() {
  State.setUserRegion(null);
  showMainContent();
}

/**
 * Show all main content sections and render dynamic content.
 * @returns {void}
 */
function showMainContent() {
  Nav.toggleSection('region-section', false);
  Nav.toggleSection('progress-section', true);
  Nav.toggleSection('phases-section', true);
  Nav.toggleSection('timeline-section', true);
  Nav.toggleSection('quick-actions', true);

  Renderer.renderProgressSteps();
  Renderer.renderPhaseCards();
  Renderer.renderTimeline(State.getUserRegion());
  Renderer.updateProgressDisplay();

  document.getElementById('progress-section')?.scrollIntoView({ behavior: 'smooth' });
  Nav.announce('Main content loaded. Navigate through phases to learn about the election process.');
}

/**
 * Open a phase detail modal (if unlocked or completed).
 * @param {number} phase - Phase number to open
 * @returns {void}
 */
function openPhase(phase) {
  const current = State.getCurrentPhase();
  const completed = State.getCompletedPhases();

  if (phase !== current && !completed.includes(phase)) { return; }

  State.setQuizPhase(phase);
  Renderer.renderPhaseModal(phase);
  Nav.openModal('phase-modal');
}
