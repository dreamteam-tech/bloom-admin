import React from 'react';
import { CLAMP_MIN_MAX } from '../common/errors';

export * from './compareUtils';

/** Returns whether `process.env.NODE_ENV` exists and equals `env`. */
export function isNodeEnv(env) {
  return typeof process !== 'undefined' && process.env && process.env.NODE_ENV === env;
}

/** Returns whether the value is a function. Acts as a type guard. */
// tslint:disable-next-line:ban-types
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Returns true if `node` is null/undefined, false, empty string, or an array
 * composed of those. If `node` is an array, only one level of the array is
 * checked, for performance reasons.
 */
export function isReactNodeEmpty(node, skipArray = false) {
  return (node == null ||
    node === '' ||
    node === false ||
    (!skipArray &&
      Array.isArray(node) &&
      // only recurse one level through arrays, for performance
      (node.length === 0 || node.every(n => isReactNodeEmpty(n, true)))));
}

/**
 * Converts a React child to an element: non-empty string or number or
 * `React.Fragment` (React 16.3+) is wrapped in given tag name; empty strings
 * are discarded.
 */
export function ensureElement(child, tagName = 'span') {
  if (child == null) {
    return undefined;
  }
  else if (typeof child === 'string') {
    // cull whitespace strings
    return child.trim().length > 0 ? React.createElement(tagName, {}, child) : undefined;
  }
  else if (typeof child === 'number' || typeof child.type === 'symbol') {
    // React.Fragment has a symbol type
    return React.createElement(tagName, {}, child);
  }
  else {
    return child;
  }
}

export function getDisplayName(ComponentClass) {
  return ComponentClass.displayName || ComponentClass.name || 'Unknown';
}

export function isElementOfType(element, ComponentClass) {
  return element != null && element.type === React.createElement(ComponentClass).type;
}

// tslint:disable-next-line:ban-types
export function safeInvoke(func, ...args) {
  if (isFunction(func)) {
    return func(...args);
  }
  return undefined;
}

// tslint:disable-next-line:ban-types
export function safeInvokeOrValue(funcOrValue, ...args) {
  return isFunction(funcOrValue) ? funcOrValue(...args) : funcOrValue;
}

export function elementIsOrContains(element, testElement) {
  return element === testElement || element.contains(testElement);
}

/**
 * Returns the difference in length between two arrays. A `null` argument is
 * considered an empty list. The return value will be positive if `a` is longer
 * than `b`, negative if the opposite is true, and zero if their lengths are
 * equal.
 */
export function arrayLengthCompare(a = [], b = []) {
  return a.length - b.length;
}

/**
 * Returns true if the two numbers are within the given tolerance of each other.
 * This is useful to correct for floating point precision issues, less useful
 * for integers.
 */
export function approxEqual(a, b, tolerance = 0.00001) {
  return Math.abs(a - b) <= tolerance;
}

/**
 * Clamps the given number between min and max values. Returns value if within
 * range, or closest bound.
 */
export function clamp(val, min, max) {
  if (val == null) {
    return val;
  }
  if (max < min) {
    throw new Error(CLAMP_MIN_MAX);
  }
  return Math.min(Math.max(val, min), max);
}

/** Returns the number of decimal places in the given number. */
export function countDecimalPlaces(num) {
  if (typeof num !== 'number' || Math.floor(num) === num) {
    return 0;
  }
  return num.toString().split('.')[1].length;
}

/**
 * Throttle an event on an EventTarget by wrapping it in a
 * `requestAnimationFrame` call. Returns the event handler that was bound to
 * given eventName so you can clean up after yourself.
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
export function throttleEvent(target, eventName, newEventName) {
  const throttledFunc = _throttleHelper((event) => {
    target.dispatchEvent(new CustomEvent(newEventName, event));
  });
  target.addEventListener(eventName, throttledFunc);
  return throttledFunc;
}

/**
 * Throttle a callback by wrapping it in a `requestAnimationFrame` call. Returns
 * the throttled function.
 * @see https://www.html5rocks.com/en/tutorials/speed/animations/
 */
export function throttleReactEventCallback(callback, options = {}) {
  const throttledFunc = _throttleHelper(callback, (event2) => {
      if (options.preventDefault) {
        event2.preventDefault();
      }
    },
    // prevent React from reclaiming the event object before we reference it
    (event2) => event2.persist());
  return throttledFunc;
}

/**
 * Throttle a method by wrapping it in a `requestAnimationFrame` call. Returns
 * the throttled function.
 */
// tslint:disable-next-line:ban-types
export function throttle(method) {
  return _throttleHelper(method);
}

// tslint:disable-next-line:ban-types
function _throttleHelper(onAnimationFrameRequested, onBeforeIsRunningCheck, onAfterIsRunningCheck) {
  let isRunning = false;
  const func = (...args) => {
    // don't use safeInvoke, because we might have more than its max number
    // of typed params
    if (isFunction(onBeforeIsRunningCheck)) {
      onBeforeIsRunningCheck(...args);
    }
    if (isRunning) {
      return;
    }
    isRunning = true;
    if (isFunction(onAfterIsRunningCheck)) {
      onAfterIsRunningCheck(...args);
    }
    requestAnimationFrame(() => {
      onAnimationFrameRequested(...args);
      isRunning = false;
    });
  };
  return func;
}
