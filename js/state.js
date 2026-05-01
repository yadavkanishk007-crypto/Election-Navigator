/**
 * @file State Management — Centralized state with pub/sub event bus
 * @module state
 * @description All app state lives here. Other modules subscribe to state
 *              changes instead of polling or tight coupling. State is kept
 *              private; access is through getter/setter functions only.
 * @author Kanishk Yadav
 * @version 2.0.0
 */
'use strict';

// ----- Internal State -----
/** @type {Object} Private application state */
const _state = {
  /** @type {string|null} */ userLevel: null,
  /** @type {string|null} */ userRegion: null,
  /** @type {number} */      currentPhase: 1,
  /** @type {number[]} */    completedPhases: [],
  /** @type {number} */      quizPhase: 1,
  /** @type {number} */      quizIndex: 0,
  /** @type {number} */      quizScore: 0
};

// ----- Event Bus -----
/** @type {Object.<string, Function[]>} Event listeners map */
const _listeners = {};

/**
 * Subscribe to a state event.
 * @param {string} event - Event name
 * @param {Function} callback - Handler function
 * @returns {void}
 */
export function subscribe(event, callback) {
  if (!_listeners[event]) { _listeners[event] = []; }
  _listeners[event].push(callback);
}

/**
 * Emit a state event to all subscribers.
 * @param {string} event - Event name
 * @param {*} [data] - Optional payload
 * @returns {void}
 */
export function emit(event, data) {
  if (_listeners[event]) {
    _listeners[event].forEach((cb) => cb(data));
  }
}

// ----- Getters -----

/**
 * Get an immutable copy of the full state.
 * @returns {{ userLevel: string|null, userRegion: string|null, currentPhase: number, completedPhases: number[], quizPhase: number, quizIndex: number, quizScore: number }}
 */
export function getState() {
  return { ..._state, completedPhases: [..._state.completedPhases] };
}

/** @returns {string|null} Current user level */
export function getUserLevel() { return _state.userLevel; }

/** @returns {string|null} Current user region */
export function getUserRegion() { return _state.userRegion; }

/** @returns {number} Current active phase */
export function getCurrentPhase() { return _state.currentPhase; }

/** @returns {number[]} Immutable copy of completed phases */
export function getCompletedPhases() { return [..._state.completedPhases]; }

/** @returns {number} Current quiz phase */
export function getQuizPhase() { return _state.quizPhase; }

/** @returns {number} Current quiz question index */
export function getQuizIndex() { return _state.quizIndex; }

/** @returns {number} Current quiz score */
export function getQuizScore() { return _state.quizScore; }

// ----- Setters (emit events on change) -----

/**
 * Set the user's knowledge level.
 * @param {string} level - 'beginner', 'intermediate', or 'expert'
 * @returns {void}
 */
export function setUserLevel(level) {
  _state.userLevel = level;
  emit('levelChanged', level);
}

/**
 * Set the user's region.
 * @param {string|null} region - Lowercase region name or null
 * @returns {void}
 */
export function setUserRegion(region) {
  _state.userRegion = region;
  emit('regionChanged', region);
}

/**
 * Set the current active phase.
 * @param {number} phase - Phase number
 * @returns {void}
 */
export function setCurrentPhase(phase) {
  _state.currentPhase = phase;
  emit('progressUpdated');
}

/**
 * Mark a phase as completed.
 * @param {number} phase - Phase number to complete
 * @returns {void}
 */
export function completePhase(phase) {
  if (!_state.completedPhases.includes(phase)) {
    _state.completedPhases.push(phase);
  }
  emit('phaseCompleted', phase);
  emit('progressUpdated');
}

/**
 * Set the quiz phase.
 * @param {number} phase - Phase number
 * @returns {void}
 */
export function setQuizPhase(phase) { _state.quizPhase = phase; }

/**
 * Set the quiz question index.
 * @param {number} index - Question index
 * @returns {void}
 */
export function setQuizIndex(index) { _state.quizIndex = index; }

/**
 * Set the quiz score.
 * @param {number} score - Score value
 * @returns {void}
 */
export function setQuizScore(score) { _state.quizScore = score; }

/**
 * Increment the quiz score by 1.
 * @returns {void}
 */
export function incrementQuizScore() { _state.quizScore++; }
