const noop = function () {};


export function getNow () {
  return (new Date).getTime();
}


/**
 * @typedef {Object} AnimationConfig
 * @property {string} easing='linear' - Easing function to be used.
 * @property {number} duration=300 - Duration of animation in milliseconds.
 * @property {number} frequency=10 - Frequency of animation redraws in milliseconds.
 * @property {Function} [on_start] - Function to be called when animation starts.
 * @property {Function} [on_finish] - Function to be called when animation completes.
 * @property {Function} [on_stop] - Function to be called when animation is stopped. Will receive current position as a parameter.
 * @property {Function} [on_end] - Function to be called when animation ends, either by finishing or by being stopped. Will receive current position as a parameter.
 * @property {Function} [on_pause] - Function to be called when animation is paused. Will receive current position as a parameter.
 * @property {Function} [on_resume] - Function to be called when animation is resumed. Will receive current position as a parameter.
 */
export const default_config = {
  easing: 'linear',
  duration: 300,
  frequency: 10,
  // repeat: 1,
  on_start: noop,
  on_finish: noop,
  on_stop: noop,
  on_end: noop,  // finish or stop
  on_tick: noop,
  on_pause: noop,
  on_resume: noop
};


export function sanitizeConfig (config = {}, existing_config = default_config) {
  const result = Object.assign({}, existing_config);

  Object.keys(default_config).forEach(function (key) {
    const config_val = config[key];
    const default_val = default_config[key];

    // check value type, throw error if it does not match default value type
    if (
      (typeof config_val !== 'undefined') &&
      (typeof config_val !== typeof default_val)
    ) {
      const error_message = 'Animate: ' +
        'Config property "' + key + '" ' +
        'is of type "' + (typeof config_val) + '",' +
        'should be "' + (typeof default_val) + '".';
      throw new TypeError(error_message);
    }

    // assign config value if defined
    if (typeof config_val !== 'undefined') {
      result[key] =  config_val;
    }
  });

  return result;
}


/*
function easePosition (position) {
  return (-Math.cos(position * Math.PI) / 2) + 0.5;
}
 */

function easePosition (position) {
  return position;
}


export function calculatePosition (start, duration) {
  const now = getNow();
  const end = start + duration;
  // position without easing applied
  const position = (now >= end) ? 1 : easePosition((now - start) / duration);
  return position;
}


