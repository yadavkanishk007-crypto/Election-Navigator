/**
 * @file Renderer — All DOM rendering logic with safe HTML, i18n, and efficiency
 * @module renderer
 * @description Handles rendering of phase cards, progress tracker, timeline,
 *              modal content, and i18n translation application using DocumentFragment
 *              and requestAnimationFrame for optimal performance.
 * @author Kanishk Yadav
 * @version 2.0.0
 */
'use strict';

import { PHASES, getPhaseCount } from '../data/phases.js';
import { getTimeline } from '../data/timelines.js';
import * as State from './state.js';
import { t } from './i18n.js';
import { sanitizeHTML, escapeHTML } from './security.js';
import { announce } from './navigation.js';

/** @type {Object.<string, HTMLElement>} Cached DOM element references */
const _cache = {};

/**
 * Get a cached DOM element reference.
 * @param {string} id - Element ID
 * @returns {HTMLElement|null} Cached element or null
 */
function getEl(id) {
  if (!_cache[id]) { _cache[id] = document.getElementById(id); }
  return _cache[id];
}

/**
 * Render all phase cards into #phases-grid using DocumentFragment.
 * @returns {void}
 */
export function renderPhaseCards() {
  const grid = getEl('phases-grid');
  if (!grid) { return; }

  const count = getPhaseCount();
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= count; i++) {
    const phase = PHASES[i];
    const isFirst = i === 1;

    const card = document.createElement('div');
    card.className = `phase-card ${isFirst ? 'active' : 'locked'}`;
    card.id = `phase-card-${i}`;
    card.dataset.phase = String(i);
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Phase ${i}: ${escapeHTML(phase.title)} — ${isFirst ? 'Ready' : 'Locked'}`);

    const statusText = isFirst ? t('phases.statusReady') : t('phases.statusLocked');
    const truncatedText = escapeHTML(phase.sections[0].text.substring(0, 100));
    const tags = phase.sections.map((s) => `<span class="tag">${escapeHTML(s.heading.split(' ').pop())}</span>`).join('');

    card.innerHTML = `
      <div class="phase-number" aria-hidden="true">${String(i).padStart(2, '0')}</div>
      <div class="phase-icon" aria-hidden="true">${phase.icon}</div>
      <h3>${escapeHTML(phase.title)}</h3>
      <p>${truncatedText}...</p>
      <div class="phase-tags">${tags}</div>
      <div class="phase-status glow-tab" id="status-${i}">${statusText}</div>`;

    card.addEventListener('click', () => window.openPhase(i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.openPhase(i);
      }
    });

    fragment.appendChild(card);
  }

  grid.innerHTML = '';
  grid.appendChild(fragment);
}

/**
 * Render progress step dots into #progress-track using DocumentFragment.
 * @returns {void}
 */
export function renderProgressSteps() {
  const track = getEl('progress-track');
  if (!track) { return; }

  const count = getPhaseCount();
  const fragment = document.createDocumentFragment();

  for (let i = 1; i <= count; i++) {
    const step = document.createElement('div');
    step.className = `progress-step ${i === 1 ? 'active' : ''}`;
    step.id = `prog-${i}`;
    step.setAttribute('role', 'listitem');
    step.setAttribute('aria-label', `Phase ${i}: ${PHASES[i].title.split(' ')[0]}`);
    if (i === 1) { step.setAttribute('aria-current', 'step'); }

    step.innerHTML = `
      <div class="step-dot" aria-hidden="true">${i}</div>
      <span>${escapeHTML(PHASES[i].title.split(' ')[0])}</span>`;

    fragment.appendChild(step);

    if (i < count) {
      const line = document.createElement('div');
      line.className = 'progress-line';
      line.id = `line-${i}`;
      line.setAttribute('aria-hidden', 'true');
      fragment.appendChild(line);
    }
  }

  track.innerHTML = '';
  track.appendChild(fragment);
}

/**
 * Update progress tracker, unicode bar, and phase card statuses.
 * Uses requestAnimationFrame for visual updates.
 * @returns {void}
 */
export function updateProgressDisplay() {
  requestAnimationFrame(() => {
    const completed = State.getCompletedPhases();
    const current = State.getCurrentPhase();
    const count = getPhaseCount();

    for (let i = 1; i <= count; i++) {
      const step = getEl(`prog-${i}`);
      const card = getEl(`phase-card-${i}`);
      const status = getEl(`status-${i}`);

      if (!step || !card || !status) { continue; }

      // Reset
      step.className = 'progress-step';
      step.removeAttribute('aria-current');
      card.className = 'phase-card';

      if (completed.includes(i)) {
        step.classList.add('completed');
        card.classList.add('done');
        status.textContent = t('phases.statusComplete');
        card.setAttribute('aria-label', `Phase ${i}: ${PHASES[i].title} — Complete`);
      } else if (i === current) {
        step.classList.add('active');
        step.setAttribute('aria-current', 'step');
        card.classList.add('active');
        status.textContent = t('phases.statusReady');
        card.setAttribute('aria-label', `Phase ${i}: ${PHASES[i].title} — Ready`);
      } else {
        card.classList.add('locked');
        status.textContent = t('phases.statusLocked');
        card.setAttribute('aria-label', `Phase ${i}: ${PHASES[i].title} — Locked`);
      }

      if (i < count) {
        const line = getEl(`line-${i}`);
        if (line) { line.className = completed.includes(i) ? 'progress-line filled' : 'progress-line'; }
      }
    }

    // Unicode progress bar
    const pct = Math.round((completed.length / count) * 100);
    const filled = Math.round((completed.length / count) * 10);
    const empty = 10 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);

    const visual = getEl('progress-bar-visual');
    const pctEl = getEl('progress-pct');
    const progressBar = getEl('unicode-progress');
    if (visual) { visual.textContent = `[${bar}]`; }
    if (pctEl) { pctEl.textContent = `${pct}%`; }
    if (progressBar) { progressBar.setAttribute('aria-valuenow', String(pct)); }

    // Quick action label
    const labels = {
      1: t('quickActions.registration'),
      2: '👥 ' + t('header.phases'),
      3: '🗳️ ' + t('header.phases'),
      4: '📊 ' + t('header.phases')
    };
    const qaLearn = getEl('qa-learn');
    if (qaLearn) { qaLearn.textContent = labels[current] || labels[1]; }

    // Announce to screen readers
    if (completed.length > 0) {
      announce(`Progress: ${pct}% complete. ${completed.length} of ${count} phases finished.`);
    }
  });
}

/**
 * Render timeline items from data using DocumentFragment.
 * @param {string|null} region - Lowercase region name
 * @returns {void}
 */
export function renderTimeline(region) {
  const container = getEl('timeline-container');
  const desc = getEl('timeline-desc');
  if (!container) { return; }

  const { items, label } = getTimeline(region);
  if (desc) { desc.textContent = label; }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'tl-item';
    div.setAttribute('role', 'listitem');
    div.innerHTML = `
      <div class="tl-dot" aria-hidden="true"></div>
      <h4>${escapeHTML(item.title)}</h4>
      <div class="tl-date">${escapeHTML(item.date)}</div>
      <p>${escapeHTML(item.desc)}</p>`;
    fragment.appendChild(div);
  });

  container.innerHTML = '';
  container.appendChild(fragment);
}

/**
 * Render phase content into the modal body.
 * Uses sanitizeHTML for trusted data source HTML.
 * @param {number} phaseId - Phase number
 * @returns {void}
 */
export function renderPhaseModal(phaseId) {
  const data = PHASES[phaseId];
  if (!data) { return; }

  const modalBody = getEl('modal-body');
  if (!modalBody) { return; }

  let html = `<div class="neon-header" id="phase-modal-title">▌║ 💖 ${escapeHTML(data.title.toUpperCase())} ║▌</div>`;
  html += `<h2>${data.icon} ${escapeHTML(data.title)}</h2>`;

  data.sections.forEach((s) => {
    html += `<h3>${sanitizeHTML(s.heading)}</h3><p>${sanitizeHTML(s.text)}</p>`;
    if (s.list) {
      html += '<ul>' + s.list.map((li) => `<li>${sanitizeHTML(li)}</li>`).join('') + '</ul>';
    }
    if (s.infoBox) {
      html += `<div class="info-box"><p>${sanitizeHTML(s.infoBox)}</p></div>`;
    }
  });

  modalBody.innerHTML = html;
}

/**
 * Apply i18n translations to all elements with data-i18n attributes.
 * @returns {void}
 */
export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translated = t(key);
    if (translated !== key) {
      el.textContent = translated;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const translated = t(key);
    if (translated !== key) {
      el.placeholder = translated;
    }
  });
}
