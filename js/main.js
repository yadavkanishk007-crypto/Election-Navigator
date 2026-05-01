/**
 * Main Entry Point — Wires everything together
 * 
 * Imports all modules, attaches event listeners,
 * and initializes the application.
 */

import * as State from './state.js';
import * as Nav from './navigation.js';
import * as Renderer from './renderer.js';
import * as Quiz from './quiz.js';
import { getPhaseCount } from '../data/phases.js';

// ===== EXPOSE TO GLOBAL (for inline onclick handlers) =====
window.openPhase = openPhase;
window.scrollToPhases = () => Nav.scrollToSection('phases-section');
window.scrollToTimeline = () => Nav.scrollToSection('timeline-section');
window.openQuizModal = () => Quiz.openQuiz();

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  Nav.initKeyboardShortcuts();
  wireUpEventListeners();
});

// ===== EVENT WIRING =====
function wireUpEventListeners() {
  // Level selector
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectLevel(btn.dataset.level);
    });
  });

  // Region submit
  const regionSubmit = document.getElementById('region-submit');
  if (regionSubmit) {
    regionSubmit.addEventListener('click', submitRegion);
  }

  // Region skip
  const regionSkip = document.getElementById('region-skip');
  if (regionSkip) {
    regionSkip.addEventListener('click', skipRegion);
  }

  // Region input — enter key
  const regionInput = document.getElementById('region-input');
  if (regionInput) {
    regionInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitRegion();
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
  const celebrationBtn = document.querySelector('#celebration .btn-primary');
  if (celebrationBtn) {
    celebrationBtn.addEventListener('click', () => {
      document.getElementById('celebration').classList.add('hidden');
    });
  }

  // Footer nav buttons
  document.querySelectorAll('.footer-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.textContent.toLowerCase();
      if (text.includes('ᴘʜᴀꜱᴇꜱ')) Nav.scrollToSection('phases-section');
      else if (text.includes('ᴛɪᴍᴇʟɪɴᴇ')) Nav.scrollToSection('timeline-section');
      else if (text.includes('ᴜɪᴢ')) Quiz.openQuiz();
      else if (text.includes('ʜᴏᴍᴇ')) scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // State subscriptions
  State.subscribe('progressUpdated', () => Renderer.updateProgressDisplay());
}

// ===== ACTIONS =====

function selectLevel(level) {
  State.setUserLevel(level);
  document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector(`[data-level="${level}"]`)?.classList.add('selected');

  setTimeout(() => {
    Nav.toggleSection('region-section', true);
    document.getElementById('region-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 400);
}

function submitRegion() {
  const input = document.getElementById('region-input')?.value.trim();
  if (!input) return;
  State.setUserRegion(input.toLowerCase());
  showMainContent();
}

function skipRegion() {
  State.setUserRegion(null);
  showMainContent();
}

function showMainContent() {
  Nav.toggleSection('region-section', false);
  Nav.toggleSection('progress-section', true);
  Nav.toggleSection('phases-section', true);
  Nav.toggleSection('timeline-section', true);
  Nav.toggleSection('quick-actions', true);

  // Render dynamic content
  Renderer.renderProgressSteps();
  Renderer.renderPhaseCards();
  Renderer.renderTimeline(State.getUserRegion());
  Renderer.updateProgressDisplay();

  document.getElementById('progress-section')?.scrollIntoView({ behavior: 'smooth' });
}

function openPhase(phase) {
  const current = State.getCurrentPhase();
  const completed = State.getCompletedPhases();

  if (phase !== current && !completed.includes(phase)) return;

  State.setQuizPhase(phase);
  Renderer.renderPhaseModal(phase);
  Nav.openModal('phase-modal');
}
