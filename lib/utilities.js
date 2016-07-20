'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getNow = getNow;
exports.sanitizeConfig = sanitizeConfig;
exports.calculatePosition = calculatePosition;
var noop = function noop() {};

function getNow() {
  return new Date().getTime();
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
var default_config = exports.default_config = {
  easing: 'linear',
  duration: 300,
  frequency: 10,
  // repeat: 1,
  on_start: noop,
  on_finish: noop,
  on_stop: noop,
  on_end: noop, // finish or stop
  on_tick: noop,
  on_pause: noop,
  on_resume: noop
};

function sanitizeConfig() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var existing_config = arguments.length <= 1 || arguments[1] === undefined ? default_config : arguments[1];

  var result = _extends({}, existing_config);

  Object.keys(default_config).forEach(function (key) {
    var config_val = config[key];
    var default_val = default_config[key];

    // check value type, throw error if it does not match default value type
    if (typeof config_val !== 'undefined' && (typeof config_val === 'undefined' ? 'undefined' : _typeof(config_val)) !== (typeof default_val === 'undefined' ? 'undefined' : _typeof(default_val))) {
      var error_message = 'Animate: ' + 'Config property "' + key + '" ' + 'is of type "' + (typeof config_val === 'undefined' ? 'undefined' : _typeof(config_val)) + '",' + 'should be "' + (typeof default_val === 'undefined' ? 'undefined' : _typeof(default_val)) + '".';
      throw new TypeError(error_message);
    }

    // assign config value if defined
    if (typeof config_val !== 'undefined') {
      result[key] = config_val;
    }
  });

  return result;
}

/*
function easePosition (position) {
  return (-Math.cos(position * Math.PI) / 2) + 0.5;
}
 */

function easePosition(position) {
  return position;
}

function calculatePosition(start, duration) {
  var now = getNow();
  var end = start + duration;
  // position without easing applied
  var position = now >= end ? 1 : easePosition((now - start) / duration);
  return position;
}