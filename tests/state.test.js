/**
 * State Module Tests
 */
import { describe, it, expect } from './test-runner.js';
import * as State from '../js/state.js';

export function runStateTests() {
  describe('State Management', () => {
    it('should initialize with default values', () => {
      const s = State.getState();
      expect(s.currentPhase).toBe(1);
      expect(s.completedPhases).toEqual([]);
      expect(s.userLevel).toBe(null);
      expect(s.quizScore).toBe(0);
    });

    it('should set and get user level', () => {
      State.setUserLevel('beginner');
      expect(State.getUserLevel()).toBe('beginner');
    });

    it('should set and get user region', () => {
      State.setUserRegion('india');
      expect(State.getUserRegion()).toBe('india');
    });

    it('should complete a phase', () => {
      State.completePhase(1);
      expect(State.getCompletedPhases()).toContain(1);
    });

    it('should not duplicate completed phases', () => {
      State.completePhase(1);
      State.completePhase(1);
      const completed = State.getCompletedPhases();
      const count = completed.filter(p => p === 1).length;
      expect(count).toBe(1);
    });

    it('should advance current phase', () => {
      State.setCurrentPhase(2);
      expect(State.getCurrentPhase()).toBe(2);
    });

    it('should track quiz score', () => {
      State.setQuizScore(0);
      State.incrementQuizScore();
      State.incrementQuizScore();
      expect(State.getQuizScore()).toBe(2);
    });

    it('should emit events on state change', () => {
      let emitted = false;
      State.subscribe('levelChanged', () => { emitted = true; });
      State.setUserLevel('expert');
      expect(emitted).toBeTruthy();
    });

    it('should return immutable state copy', () => {
      const s1 = State.getState();
      s1.currentPhase = 999;
      expect(State.getCurrentPhase()).toNotContain(999);
    });
  });
}
