/**
 * @file Quiz Engine — Self-contained quiz module with security, i18n, and assertive a11y
 * @module quiz
 * @description Manages quiz flow: question rendering, answer validation, scoring,
 *              pass/fail determination, and phase progression.
 * @author Kanishk Yadav
 * @version 2.0.0
 */
'use strict';

import { QUIZZES } from '../data/quizzes.js';
import { getPhaseCount } from '../data/phases.js';
import * as State from './state.js';
import { openModal, closeModal, announce, announceAssertive } from './navigation.js';
import { updateProgressDisplay } from './renderer.js';
import { t } from './i18n.js';
import { escapeHTML, isValidIndex } from './security.js';
import { trackQuizResult } from './analytics.js';

/** @type {number} Minimum pass rate (66%) */
const PASS_THRESHOLD = 0.66;

/**
 * Start a quiz for a specific phase.
 * @param {number} phaseId - Phase number (1-indexed)
 * @returns {void}
 */
export function startQuiz(phaseId) {
  if (!isValidIndex(phaseId, 1, getPhaseCount())) { return; }
  State.setQuizPhase(phaseId);
  State.setQuizIndex(0);
  State.setQuizScore(0);
  openQuiz();
}

/**
 * Open the quiz modal and render the first question.
 * @returns {void}
 */
export function openQuiz() {
  openModal('quiz-modal');
  renderQuestion();
}

/**
 * Close the quiz modal.
 * @returns {void}
 */
export function closeQuiz() {
  closeModal('quiz-modal');
}

/**
 * Render the current quiz question using safe DOM methods.
 * @returns {void}
 */
export function renderQuestion() {
  const phase = State.getQuizPhase();
  const index = State.getQuizIndex();
  const questions = QUIZZES[phase];

  if (!questions || index >= questions.length) {
    showResults();
    return;
  }

  const q = questions[index];
  const letters = ['A', 'B', 'C', 'D'];
  const quizBody = document.getElementById('quiz-body');
  if (!quizBody) { return; }

  const headerText = t('quiz.header', { phase, current: index + 1, total: questions.length });

  let html = `<div class="neon-header" id="quiz-modal-title">▌║ 🧠 ${escapeHTML(headerText)} ║▌</div>`;
  html += `<h2>${t('quiz.title')}</h2>`;
  html += `<p class="quiz-question" id="quiz-question-text">${escapeHTML(q.q)}</p>`;
  html += '<div class="quiz-options" role="group" aria-labelledby="quiz-question-text">';

  q.options.forEach((opt, i) => {
    html += `<button class="quiz-option" data-index="${i}" aria-label="Option ${letters[i]}: ${escapeHTML(opt)}">
      <span class="opt-letter" aria-hidden="true">${letters[i]}</span>${escapeHTML(opt)}
    </button>`;
  });

  html += '</div><div id="quiz-feedback-area" aria-live="assertive" aria-atomic="true"></div>';
  quizBody.innerHTML = html;

  // Attach click handlers
  quizBody.querySelectorAll('.quiz-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      if (isValidIndex(idx, 0, q.options.length - 1)) {
        handleAnswer(idx);
      }
    });
  });

  announce(`Question ${index + 1} of ${questions.length}: ${q.q}`);
}

/**
 * Handle a quiz answer selection.
 * @param {number} selected - Index of selected option
 * @returns {void}
 */
function handleAnswer(selected) {
  const phase = State.getQuizPhase();
  const index = State.getQuizIndex();
  const questions = QUIZZES[phase];
  if (!questions || !questions[index]) { return; }

  const q = questions[index];
  const isCorrect = selected === q.correct;

  if (isCorrect) { State.incrementQuizScore(); }

  // Disable all options and highlight correct/wrong
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
    if (i === q.correct) { btn.classList.add('correct'); }
    if (i === selected && !isCorrect) { btn.classList.add('wrong'); }
  });

  const fbIcon = isCorrect ? t('quiz.correct') : t('quiz.wrong');
  const isLast = index >= questions.length - 1;
  const nextLabel = isLast ? t('quiz.seeResults') : t('quiz.next');

  const feedbackArea = document.getElementById('quiz-feedback-area');
  if (feedbackArea) {
    const fbClass = isCorrect ? 'correct-fb' : 'wrong-fb';
    feedbackArea.innerHTML = `
      <div class="quiz-feedback ${fbClass}"><strong>${fbIcon}</strong> ${escapeHTML(q.explanation)}</div>
      <button class="btn-primary quiz-next-btn" id="quiz-next-btn" aria-label="${escapeHTML(nextLabel)}">
        ${escapeHTML(nextLabel)}
      </button>`;

    document.getElementById('quiz-next-btn')?.addEventListener('click', () => {
      State.setQuizIndex(index + 1);
      renderQuestion();
    });
  }

  // Use assertive announcement for immediate quiz feedback
  announceAssertive(isCorrect ? 'Correct!' : `Incorrect. ${q.explanation}`);
}

/**
 * Show quiz results and handle pass/fail logic.
 * @returns {void}
 */
function showResults() {
  const phase = State.getQuizPhase();
  const score = State.getQuizScore();
  const total = QUIZZES[phase].length;
  const pct = Math.round((score / total) * 100);
  const passed = (score / total) >= PASS_THRESHOLD;

  // Track analytics
  trackQuizResult(phase, passed, score, total);

  const emoji = passed ? '🎉' : '📖';
  const msg = passed ? t('quiz.resultPass') : t('quiz.resultFail');
  const scoreLabel = t('quiz.scoreLabel', { score, total, pct });

  const quizBody = document.getElementById('quiz-body');
  if (!quizBody) { return; }

  let html = `<div class="quiz-score">
    <div class="score-emoji" aria-hidden="true">${emoji}</div>
    <h3>${escapeHTML(scoreLabel)}</h3>
    <p>${escapeHTML(msg)}</p>`;

  if (passed) {
    const completeLabel = t('quiz.completePhase', { phase });
    html += `<button class="btn-primary" id="complete-phase-btn">${escapeHTML(completeLabel)}</button>`;
  } else {
    html += `<button class="btn-primary" id="retry-quiz-btn">${t('quiz.retry')}</button>
             <button class="btn-ghost quiz-review-btn" id="review-btn">${t('quiz.review')}</button>`;
  }

  html += '</div>';
  quizBody.innerHTML = html;

  // Wire up buttons
  document.getElementById('complete-phase-btn')?.addEventListener('click', () => {
    const count = getPhaseCount();
    State.completePhase(phase);
    if (phase < count) { State.setCurrentPhase(phase + 1); }
    closeQuiz();
    updateProgressDisplay();

    if (State.getCompletedPhases().length === count) {
      setTimeout(() => {
        document.getElementById('celebration')?.classList.remove('hidden');
        announce(t('celebration.title'));
      }, 500);
    }
  });

  document.getElementById('retry-quiz-btn')?.addEventListener('click', () => {
    State.setQuizIndex(0);
    State.setQuizScore(0);
    renderQuestion();
  });

  document.getElementById('review-btn')?.addEventListener('click', closeQuiz);

  announceAssertive(`Quiz complete. ${score} out of ${total} correct. ${passed ? 'Passed!' : 'Try again.'}`);
}
