let idCounter = 0

/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */
function generateId() {
  return String(idCounter++)
}

/**
 * Resets idCounter to 0. Used for SSR.
 */
function resetIdCounter() {
  idCounter = 0
}

function noop() {}

/**
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them sets
 * `event.preventDownshiftDefault = true`.
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */
function callAllEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some(fn => {
      fn && fn(event, ...args)
      return (
        event.preventTabsDefault ||
        (event.hasOwnProperty('nativeEvent') &&
          event.nativeEvent.preventTabsDefault)
      )
    })
}

/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */
function unwrapArray(arg, defaultValue) {
  const _arg = Array.isArray(arg)
    ? /* istanbul ignore next (preact) */ arg[0]
    : arg
  if (!_arg && defaultValue) {
    return defaultValue
  } else {
    return _arg
  }
}

export {
  callAllEventHandlers,
  generateId,
  resetIdCounter,
  noop,
  unwrapArray,
}
