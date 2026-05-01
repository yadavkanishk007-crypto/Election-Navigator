/**
 * State Management — Centralized state with pub/sub event bus
 * 
 * All app state lives here. Other modules subscribe to state
 * changes instead of polling or tight coupling.
 */

// ----- Internal State -----
const _state = {
  userLevel: null,
  userRegion: null,
  currentPhase: 1,
  completedPhases: [],
  quizPhase: 1,
  quizIndex: 0,
  quizScore: 0
};

// ----- Event Bus -----
const _listeners = {};

/**
 * Subscribe to a state event.
 * @param {string} event - Event name
 * @param {Function} callback - Handler function
 */
export function subscribe(event, callback) {
  if (!_listeners[event]) _listeners[event] = [];
  _listeners[event].push(callback);
}

/**
 * Emit a state event to all subscribers.
 * @param {string} event - Event name
 * @param {*} data - Optional payload
 */
export function emit(event, data) {
  if (_listeners[event]) {
    _listeners[event].forEach(cb => cb(data));
  }
}

// ----- Getters -----
export function getState() {
  return { ..._state, completedPhases: [..._state.completedPhases] };
}

export function getUserLevel() { return _state.userLevel; }
export function getUserRegion() { return _state.userRegion; }
export function getCurrentPhase() { return _state.currentPhase; }
export function getCompletedPhases() { return [..._state.completedPhases]; }
export function getQuizPhase() { return _state.quizPhase; }
export function getQuizIndex() { return _state.quizIndex; }
export function getQuizScore() { return _state.quizScore; }

// ----- Setters (emit events on change) -----

export function setUserLevel(level) {
  _state.userLevel = level;
  emit('levelChanged', level);
}

export function setUserRegion(region) {
  _state.userRegion = region;
  emit('regionChanged', region);
}

export function setCurrentPhase(phase) {
  _state.currentPhase = phase;
  emit('progressUpdated');
}

export function completePhase(phase) {
  if (!_state.completedPhases.includes(phase)) {
    _state.completedPhases.push(phase);
  }
  emit('phaseCompleted', phase);
  emit('progressUpdated');
}

export function setQuizPhase(phase) { _state.quizPhase = phase; }
export function setQuizIndex(index) { _state.quizIndex = index; }
export function setQuizScore(score) { _state.quizScore = score; }
export function incrementQuizScore() { _state.quizScore++; }
