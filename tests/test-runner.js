/**
 * Lightweight Test Runner — No dependencies
 * Provides describe(), it(), expect() with assertions
 */

const _results = { passed: 0, failed: 0, errors: [] };

/**
 * Describe a test suite.
 * @param {string} name - Suite name
 * @param {Function} fn - Suite body
 */
export function describe(name, fn) {
  console.group(`📋 ${name}`);
  try { fn(); } catch (e) { console.error('Suite error:', e); }
  console.groupEnd();
}

/**
 * Define a single test case.
 * @param {string} name - Test name
 * @param {Function} fn - Test body
 */
export function it(name, fn) {
  try {
    fn();
    _results.passed++;
    console.log(`  ✅ ${name}`);
  } catch (e) {
    _results.failed++;
    _results.errors.push({ test: name, error: e.message });
    console.error(`  ❌ ${name}: ${e.message}`);
  }
}

/**
 * Create an expectation for assertions.
 * @param {*} actual - Actual value
 * @returns {Object} Assertion chain
 */
export function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected))
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    toBeTruthy() {
      if (!actual) throw new Error(`Expected truthy, got ${JSON.stringify(actual)}`);
    },
    toBeFalsy() {
      if (actual) throw new Error(`Expected falsy, got ${JSON.stringify(actual)}`);
    },
    toBeGreaterThan(expected) {
      if (!(actual > expected)) throw new Error(`Expected ${actual} > ${expected}`);
    },
    toBeLessThanOrEqual(expected) {
      if (!(actual <= expected)) throw new Error(`Expected ${actual} <= ${expected}`);
    },
    toContain(expected) {
      if (typeof actual === 'string') {
        if (!actual.includes(expected)) throw new Error(`Expected "${actual}" to contain "${expected}"`);
      } else if (Array.isArray(actual)) {
        if (!actual.includes(expected)) throw new Error(`Expected array to contain ${JSON.stringify(expected)}`);
      }
    },
    toNotContain(expected) {
      if (typeof actual === 'string') {
        if (actual.includes(expected)) throw new Error(`Expected "${actual}" to NOT contain "${expected}"`);
      }
    },
    toBeInstanceOf(type) {
      if (!(actual instanceof type)) throw new Error(`Expected instance of ${type.name}`);
    },
    toThrow() {
      let threw = false;
      try { actual(); } catch(e) { threw = true; }
      if (!threw) throw new Error('Expected function to throw');
    },
    toHaveLength(expected) {
      if (actual.length !== expected) throw new Error(`Expected length ${expected}, got ${actual.length}`);
    },
    toBeTypeOf(type) {
      if (typeof actual !== type) throw new Error(`Expected type "${type}", got "${typeof actual}"`);
    }
  };
}

/**
 * Get test results summary.
 * @returns {{ passed: number, failed: number, errors: Array }}
 */
export function getResults() {
  return { ..._results };
}

/**
 * Display results in the DOM.
 * @param {HTMLElement} container
 */
export function displayResults(container) {
  const total = _results.passed + _results.failed;
  const pct = total > 0 ? Math.round((_results.passed / total) * 100) : 0;

  let html = `<div class="test-summary">
    <h2>Test Results: ${_results.passed}/${total} passed (${pct}%)</h2>
    <div class="test-bar">
      <div class="test-bar-fill" style="width:${pct}%;background:${_results.failed === 0 ? '#10b981' : '#ef4444'}"></div>
    </div>`;

  if (_results.errors.length > 0) {
    html += '<h3>Failures:</h3><ul>';
    _results.errors.forEach(e => {
      html += `<li><strong>${e.test}</strong>: ${e.error}</li>`;
    });
    html += '</ul>';
  }

  html += '</div>';
  container.innerHTML = html;
}
