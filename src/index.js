import * as ease from 'easing-utils';


const noop = function () {};


export function getNow () {
  return (new Date).getTime();
}


/**
 * @typedef {Object} AnimationConfig
 * @property {string} [easing] - Identifier of easing function. See this page for list of available values and examples: https://delvarworld.github.io/easing-utils/gh-pages/
 * @property {number} [duration] - Duration of animation in milliseconds.
 * @property {number} [frequency] - Frequency of animation in milliseconds.
 * @property {Function} [on_start] - Function to be called when animation starts.
 * @property {Function} [on_finish] - Function to be called when animation finishes.
 * @property {Function} [on_stop] - Function to be called when animation is stopped. Receives current position as parameter.
 * @property {Function} [on_end] - Function to be called when animation ends for whatever reason (finish, stop). Receives current position as parameter.
 * @property {Function} [on_tick] - Function to be called when animation ticks. Receives current position as parameter.
 * @property {Function} [on_pause] - Function to be called when animation is paused. Receives current position as parameter.
 * @property {Function} [on_resume] - Function to be called when animation is resumed. Receives current position as parameter.
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


/**
 * Class representing the animation.
 * @name Animation
 */
export default class Animation {

  /**
   * Create animation.
   * @param {AnimationConfig} custom_config
   */
  constructor (custom_config = {}) {
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
  isRunning () {
    return this._started !== null;
  }


  /**
   * Returns `true` if animation is paused.
   * @returns {boolean}
   */
  isPaused () {
    return this._paused !== null;
  }


  /**
   * Starts the animation. If the animation was running prior to starting, it will be stopped first.
   */
  start () {
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
  stop () {
    if (this.isRunning()) {
      this._config.on_stop(this.getPosition());
      this._end();
    }
  }


  /**
   * Pauses running animation. If animation is not running, nothing happens.
   */
  pause () {
    if (this.isRunning() && !this.isPaused()) {
      this._stopTimer();
      this._paused = getNow();
      this._config.on_pause(this.getPosition());
    }
  }


  /**
   * Resumes paused animation. If animation is not paused, nothing happens.
   */
  resume () {
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
  getPosition () {
    if (!this.isRunning()) {return 0;}

    const start = this._started;
    const duration = this._config.duration;
    const easing = this._config.easing;
    const now = getNow();
    const end = start + duration;
    return (now >= end) ? 1 : ease[easing]((now - start) / duration);
  }


  /**
   * Updates animation config with new values. Unknown values will be ignored.
   * @param {AnimationConfig} config
   */
  updateConfig (config = {}) {
    if (typeof config.easing === 'string') {
      this._config.easing = config.easing;
    }

    if (!isNaN(config.duration)) {
      this._config.duration = config.duration;
    }

    if (!isNaN(config.frequency)) {
      this._config.frequency = config.frequency;
    }

    ['start', 'finish', 'stop', 'end', 'tick', 'pause', 'resume']
      .forEach((callback_type) => {
        const callback_id = `on_${callback_type}`;
        if (typeof config[callback_id] === 'function') {
          this._config[callback_id] = config[callback_id];
        }
      });
  }


  /**
   * Starts the animation timer.
   * @private
   */
  _startTimer () {
    this._timer = setInterval(() => {this._tick()}, this._config.frequency);
  }


  /**
   * Stops the animatino timer.
   * @private
   */
  _stopTimer () {
    clearInterval(this._timer);
  }


  /**
   * Evaluates the position of animation. Stops it if position reaches 1.
   * @private
   */
  _tick () {
    const position = this.getPosition();
    this._config.on_tick(position);
    if (position === 1) {
      this._finish();
    }
  }


  /**
   * Ends the animation, cleans up the metadata used when running.
   * @private
   */
  _end () {
    this._stopTimer();
    this._config.on_end(this.getPosition());
    this._started = null;
    this._paused = null;
  }


  /**
   * Called when animation runs to the end.
   * @private
   */
  _finish () {
    this._end();
    this._config.on_finish();
  }

}
