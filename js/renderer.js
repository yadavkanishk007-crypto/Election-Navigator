/**
 * Renderer — All DOM rendering logic
 * 
 * Dynamically generates phase cards, progress tracker steps,
 * timeline items, and modal content from data files.
 * Reads state from state.js, reads content from data/*.js.
 */

import { PHASES, getPhaseCount } from '../data/phases.js';
import { getTimeline } from '../data/timelines.js';
import * as State from './state.js';

// ----- Phase Cards (dynamic) -----

/**
 * Render all phase cards into #phases-grid.
 * Called once on init. Status is updated separately.
 */
export function renderPhaseCards() {
  const grid = document.getElementById('phases-grid');
  if (!grid) return;

  const count = getPhaseCount();
  let html = '';

  for (let i = 1; i <= count; i++) {
    const phase = PHASES[i];
    const isFirst = i === 1;

    html += `
      <div class="phase-card ${isFirst ? 'active' : 'locked'}" id="phase-card-${i}" data-phase="${i}">
        <div class="phase-number">${String(i).padStart(2, '0')}</div>
        <div class="phase-icon">${phase.icon}</div>
        <h3>${phase.title}</h3>
        <p>${phase.sections[0].text.substring(0, 100)}...</p>
        <div class="phase-tags">
          ${phase.sections.map(s => `<span class="tag">${s.heading.split(' ').pop()}</span>`).join('')}
        </div>
        <div class="phase-status glow-tab" id="status-${i}">
          ${isFirst ? '[ ꜱᴛᴀᴛᴜꜱ: 🟢 ʀᴇᴀᴅʏ ]' : '[ ꜱᴛᴀᴛᴜꜱ: 🔴 ʟᴏᴄᴋᴇᴅ ]'}
        </div>
      </div>`;
  }

  grid.innerHTML = html;

  // Attach click handlers
  grid.querySelectorAll('.phase-card').forEach(card => {
    card.addEventListener('click', () => {
      const phase = parseInt(card.dataset.phase);
      window.openPhase(phase);
    });
  });
}

// ----- Progress Tracker (dynamic) -----

/**
 * Render progress step dots into #progress-track.
 * Called once on init. Updated via updateProgressDisplay().
 */
export function renderProgressSteps() {
  const track = document.getElementById('progress-track');
  if (!track) return;

  const count = getPhaseCount();
  let html = '';

  for (let i = 1; i <= count; i++) {
    html += `
      <div class="progress-step ${i === 1 ? 'active' : ''}" id="prog-${i}">
        <div class="step-dot">${i}</div>
        <span>${PHASES[i].title.split(' ')[0]}</span>
      </div>`;

    if (i < count) {
      html += `<div class="progress-line" id="line-${i}"></div>`;
    }
  }

  track.innerHTML = html;
}

// ----- Update Progress Display -----

/**
 * Update progress tracker, unicode bar, and phase card statuses.
 * Called whenever state changes.
 */
export function updateProgressDisplay() {
  const completed = State.getCompletedPhases();
  const current = State.getCurrentPhase();
  const count = getPhaseCount();

  // Update step dots
  for (let i = 1; i <= count; i++) {
    const step = document.getElementById(`prog-${i}`);
    const card = document.getElementById(`phase-card-${i}`);
    const status = document.getElementById(`status-${i}`);

    if (!step || !card || !status) continue;

    step.className = 'progress-step';
    card.className = 'phase-card';

    if (completed.includes(i)) {
      step.classList.add('completed');
      card.classList.add('done');
      status.className = 'phase-status glow-tab';
      status.innerHTML = '[ ꜱᴛᴀᴛᴜꜱ: ✅ ᴄᴏᴍᴘʟᴇᴛᴇ ]';
    } else if (i === current) {
      step.classList.add('active');
      card.classList.add('active');
      status.className = 'phase-status glow-tab';
      status.innerHTML = '[ ꜱᴛᴀᴛᴜꜱ: 🟢 ʀᴇᴀᴅʏ ]';
    } else {
      card.classList.add('locked');
      status.className = 'phase-status glow-tab';
      status.innerHTML = '[ ꜱᴛᴀᴛᴜꜱ: 🔴 ʟᴏᴄᴋᴇᴅ ]';
    }

    if (i < count) {
      const line = document.getElementById(`line-${i}`);
      if (line) line.className = completed.includes(i) ? 'progress-line filled' : 'progress-line';
    }
  }

  // Update unicode progress bar
  const pct = Math.round((completed.length / count) * 100);
  const filled = Math.round((completed.length / count) * 10);
  const empty = 10 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  const visual = document.getElementById('progress-bar-visual');
  const pctEl = document.getElementById('progress-pct');
  if (visual) visual.textContent = `[${bar}]`;
  if (pctEl) pctEl.textContent = `${pct}%`;

  // Update quick action label
  const labels = {
    1: '📋 ʀᴇɢɪꜱᴛʀᴀᴛɪᴏɴ',
    2: '👥 ᴄᴀɴᴅɪᴅᴀᴛᴇꜱ',
    3: '🗳️ ᴠᴏᴛɪɴɢ',
    4: '📊 ʀᴇꜱᴜʟᴛꜱ'
  };
  const qaLearn = document.getElementById('qa-learn');
  if (qaLearn) qaLearn.textContent = labels[current] || labels[1];
}

// ----- Timeline -----

/**
 * Render timeline items from data.
 * @param {string|null} region
 */
export function renderTimeline(region) {
  const container = document.getElementById('timeline-container');
  const desc = document.getElementById('timeline-desc');
  if (!container) return;

  const { items, label } = getTimeline(region);
  if (desc) desc.textContent = label;

  container.innerHTML = items.map(item => `
    <div class="tl-item">
      <div class="tl-dot"></div>
      <h4>${item.title}</h4>
      <div class="tl-date">${item.date}</div>
      <p>${item.desc}</p>
    </div>
  `).join('');
}

// ----- Phase Modal Content -----

/**
 * Render phase content into the modal body.
 * @param {number} phaseId
 */
export function renderPhaseModal(phaseId) {
  const data = PHASES[phaseId];
  if (!data) return;

  let html = `<div class="neon-header">▌║ 💖 ꜱʏꜱᴛᴇᴍ ᴘʜᴀꜱᴇ: ${data.title.toUpperCase()} ║▌</div>`;
  html += `<h2>${data.icon} ${data.title}</h2>`;

  data.sections.forEach(s => {
    html += `<h3>${s.heading}</h3><p>${s.text}</p>`;
    if (s.list) {
      html += '<ul>' + s.list.map(li => `<li>${li}</li>`).join('') + '</ul>';
    }
    if (s.infoBox) {
      html += `<div class="info-box"><p>${s.infoBox}</p></div>`;
    }
  });

  document.getElementById('modal-body').innerHTML = html;
}
