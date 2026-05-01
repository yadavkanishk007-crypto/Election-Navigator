/**
 * Quiz Engine — Self-contained quiz module
 * 
 * Reads questions from data/quizzes.js.
 * Uses state.js for quiz state tracking.
 * Emits phaseCompleted via state bus on pass.
 */

import { QUIZZES } from '../data/quizzes.js';
import { getPhaseCount } from '../data/phases.js';
import * as State from './state.js';
import { openModal, closeModal } from './navigation.js';
import { updateProgressDisplay } from './renderer.js';

const PASS_THRESHOLD = 0.66;

/**
 * Start a quiz for a specific phase.
 * @param {number} phaseId
 */
export function startQuiz(phaseId) {
  State.setQuizPhase(phaseId);
  State.setQuizIndex(0);
  State.setQuizScore(0);
  openQuiz();
}

/**
 * Open the quiz modal and render the first question.
 */
export function openQuiz() {
  openModal('quiz-modal');
  renderQuestion();
}

/**
 * Close the quiz modal.
 */
export function closeQuiz() {
  closeModal('quiz-modal');
}

/**
 * Render the current quiz question.
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

  let html = `<div class="neon-header">▌║ 🧠 ᴘʜᴀꜱᴇ ${phase} — Q${index + 1}/${questions.length} ║▌</div>`;
  html += `<h2>🧠 Check for Understanding</h2>`;
  html += `<p class="quiz-question">${q.q}</p>`;
  html += '<div class="quiz-options">';

  q.options.forEach((opt, i) => {
    html += `<button class="quiz-option" data-index="${i}">
      <span class="opt-letter">${letters[i]}</span>${opt}
    </button>`;
  });

  html += '</div><div id="quiz-feedback-area"></div>';
  document.getElementById('quiz-body').innerHTML = html;

  // Attach click handlers
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
  });
}

/**
 * Handle a quiz answer selection.
 * @param {number} selected - Index of selected option
 */
function handleAnswer(selected) {
  const phase = State.getQuizPhase();
  const index = State.getQuizIndex();
  const q = QUIZZES[phase][index];
  const isCorrect = selected === q.correct;

  if (isCorrect) State.incrementQuizScore();

  // Disable all options and highlight correct/wrong
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.style.pointerEvents = 'none';
    if (i === q.correct) btn.classList.add('correct');
    if (i === selected && !isCorrect) btn.classList.add('wrong');
  });

  // Show feedback
  const fbClass = isCorrect ? 'correct-fb' : 'wrong-fb';
  const fbIcon = isCorrect ? '✅ Correct!' : '❌ Not quite.';
  const isLast = index >= QUIZZES[phase].length - 1;

  document.getElementById('quiz-feedback-area').innerHTML = `
    <div class="quiz-feedback ${fbClass}"><strong>${fbIcon}</strong> ${q.explanation}</div>
    <button class="btn-primary quiz-next-btn" id="quiz-next-btn">
      ${isLast ? 'See Results' : 'Next Question →'}
    </button>`;

  document.getElementById('quiz-next-btn').addEventListener('click', () => {
    State.setQuizIndex(index + 1);
    renderQuestion();
  });
}

/**
 * Show quiz results and handle pass/fail.
 */
function showResults() {
  const phase = State.getQuizPhase();
  const score = State.getQuizScore();
  const total = QUIZZES[phase].length;
  const pct = Math.round((score / total) * 100);
  const passed = (score / total) >= PASS_THRESHOLD;

  const emoji = passed ? '🎉' : '📖';
  const msg = passed
    ? "Great job! You've mastered this phase!"
    : 'Keep learning! Review the material and try again.';

  let html = `<div class="quiz-score">
    <div class="score-emoji">${emoji}</div>
    <h3>${score}/${total} Correct (${pct}%)</h3>
    <p>${msg}</p>`;

  if (passed) {
    html += `<button class="btn-primary" id="complete-phase-btn">✅ Complete Phase ${phase}</button>`;
  } else {
    html += `<button class="btn-primary" id="retry-quiz-btn">🔄 Retry Quiz</button>
             <button class="btn-ghost" id="review-btn" style="margin-left:10px">Review Material</button>`;
  }

  html += '</div>';
  document.getElementById('quiz-body').innerHTML = html;

  // Wire up buttons
  const completeBtn = document.getElementById('complete-phase-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const count = getPhaseCount();
      State.completePhase(phase);
      if (phase < count) State.setCurrentPhase(phase + 1);
      closeQuiz();
      updateProgressDisplay();

      // Check if all phases complete
      if (State.getCompletedPhases().length === count) {
        setTimeout(() => {
          document.getElementById('celebration').classList.remove('hidden');
        }, 500);
      }
    });
  }

  const retryBtn = document.getElementById('retry-quiz-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      State.setQuizIndex(0);
      State.setQuizScore(0);
      renderQuestion();
    });
  }

  const reviewBtn = document.getElementById('review-btn');
  if (reviewBtn) {
    reviewBtn.addEventListener('click', closeQuiz);
  }
}
