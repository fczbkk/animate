'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default_config = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getNow = getNow;

var _easingUtils = require('easing-utils');

var ease = _interopRequireWildcard(_easingUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noop = function noop() {};
var is_modern = !!window.requestAnimationFrame;

function getNow() {
  return new Date().getTime();
}

/**
 * @typedef {Object} AnimationConfig
 * @property {string} [easing] - Identifier of easing function. See this page for list of available values and examples: https://delvarworld.github.io/easing-utils/gh-pages/
 * @property {number} [duration] - Duration of animation in milliseconds.
 * @property {number} [frequency] - Frequency of animation in milliseconds. This is only used in old browsers (e.g. IE9) which do not support `window.requestAnimationFrame`.
 * @property {Function} [on_start] - Function to be called when animation starts.
 * @property {Function} [on_finish] - Function to be called when animation finishes.
 * @property {Function} [on_stop] - Function to be called when animation is stopped. Receives current position as parameter.
 * @property {Function} [on_end] - Function to be called when animation ends for whatever reason (finish, stop). Receives current position as parameter.
 * @property {Function} [on_tick] - Function to be called when animation ticks. Receives current position as parameter.
 * @property {Function} [on_pause] - Function to be called when animation is paused. Receives current position as parameter.
 * @property {Function} [on_resume] - Function to be called when animation is resumed. Receives current position as parameter.
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

/**
 * Class representing the animation.
 * @name Animation
 */

var Animation = function () {

  /**
   * Create animation.
   * @param {AnimationConfig} custom_config
   */
  function Animation() {
    var custom_config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Animation);

    this._timer = null;
    this._started = null;
    this._paused = null;

    this._config = {};
    this.updateConfig(default_config);
    this.updateConfig(custom_config);
  }

  /**
   * Returns `true` if animation is running.
   * @returns {boolean}
   */


  _createClass(Animation, [{
    key: 'isRunning',
    value: function isRunning() {
      return this._started !== null;
    }

    /**
     * Returns `true` if animation is paused.
     * @returns {boolean}
     */

  }, {
    key: 'isPaused',
    value: function isPaused() {
      return this._paused !== null;
    }

    /**
     * Starts the animation. If the animation was running prior to starting, it will be stopped first.
     */

  }, {
    key: 'start',
    value: function start() {
      if (this.isRunning()) {
        this.stop();
      }
      this._started = getNow();
      this._startTimer();
      this._config.on_start();
    }

    /**
     * Stops running animation. If animation is not running, nothing happens.
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this.isRunning()) {
        this._config.on_stop(this.getPosition());
        this._end();
      }
    }

    /**
     * Pauses running animation. If animation is not running, nothing happens.
     */

  }, {
    key: 'pause',
    value: function pause() {
      if (this.isRunning() && !this.isPaused()) {
        this._stopTimer();
        this._paused = getNow();
        this._config.on_pause(this.getPosition());
      }
    }

    /**
     * Resumes paused animation. If animation is not paused, nothing happens.
     */

  }, {
    key: 'resume',
    value: function resume() {
      if (this.isPaused()) {
        this._started = this._started + (getNow() - this._paused);
        this._paused = null;
        this._startTimer();
        this._config.on_resume(this.getPosition());
      }
    }

    /**
     * Returns current position of animation. If animation is not running, returns zero.
     * @returns {number} Value between 0 (start) and 1 (end).
     */

  }, {
    key: 'getPosition',
    value: function getPosition() {
      if (!this.isRunning()) {
        return 0;
      }

      var start = this._started;
      var duration = this._config.duration;
      var easing = this._config.easing;
      var now = getNow();
      var end = start + duration;
      return now >= end ? 1 : ease[easing]((now - start) / duration);
    }

    /**
     * Updates animation config with new values. Unknown values will be ignored.
     * @param {AnimationConfig} config
     */

  }, {
    key: 'updateConfig',
    value: function updateConfig() {
      var _this = this;

      var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      if (typeof config.easing === 'string') {
        this._config.easing = config.easing;
      }

      if (!isNaN(config.duration)) {
        this._config.duration = config.duration;
      }

      if (!isNaN(config.frequency)) {
        this._config.frequency = config.frequency;
      }

      ['start', 'finish', 'stop', 'end', 'tick', 'pause', 'resume'].forEach(function (callback_type) {
        var callback_id = 'on_' + callback_type;
        if (typeof config[callback_id] === 'function') {
          _this._config[callback_id] = config[callback_id];
        }
      });
    }

    /**
     * Starts the animation timer.
     * @private
     */

  }, {
    key: '_startTimer',
    value: function _startTimer() {
      var _this2 = this;

      if (is_modern) {
        this._tick();
      } else {
        this._timer = setInterval(function () {
          _this2._tick();
        }, this._config.frequency);
      }
    }

    /**
     * Stops the animation timer.
     * @private
     */

  }, {
    key: '_stopTimer',
    value: function _stopTimer() {
      clearInterval(this._timer);
    }

    /**
     * Evaluates the position of animation. Stops it if position reaches 1.
     * @private
     */

  }, {
    key: '_tick',
    value: function _tick() {
      if (this.isRunning() && !this.isPaused()) {
        var position = this.getPosition();
        this._config.on_tick(position);
        if (position === 1) {
          this._finish();
        }
        if (is_modern) {
          window.requestAnimationFrame(this._tick.bind(this));
        }
      }
    }

    /**
     * Ends the animation, cleans up the metadata used when running.
     * @private
     */

  }, {
    key: '_end',
    value: function _end() {
      this._stopTimer();
      this._config.on_end(this.getPosition());
      this._started = null;
      this._paused = null;
    }

    /**
     * Called when animation runs to the end.
     * @private
     */

  }, {
    key: '_finish',
    value: function _finish() {
      this._end();
      this._config.on_finish();
    }
  }]);

  return Animation;
}();

exports.default = Animation;