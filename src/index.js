import {
  sanitizeConfig,
  getNow,
  calculatePosition
} from './utilities';


/**
 * Interface of the animation object.
 * @typedef {Object} AnimationInterface
 * @property {Function} start - Starts the animation.
 * @property {Function} stop - Stops the animation.
 * @property {Function} pause - Pauses the animation. When resumed, it will continue at the same spot it was paused. Can only be paused when running.
 * @property {Function} resume - Resumes the animation. Can only be resumed when paused.
 * @property {Function} getPosition - Returns current animation position, which is number between 0 and 1.
 * @property {Function} setOptions - Updates animation options, e.g. duration, frequency. Accepts AnimationConfig object as a parameter.
 */


/**
 * @function createAnimation
 * @param {AnimationConfig} custom_config
 * @returns {AnimationInterface}
 */
export default function createAnimation (custom_config = {}) {
  let config = sanitizeConfig(custom_config);
  let timer = null;
  let is_running = false;
  let is_paused = false;

  let started = null;
  let paused = null;

  function startTimer () {
    timer = setInterval(doTick, config.frequency);
  }

  function stopTimer () {
    clearInterval(timer);
  }

  function doEnd () {
    stopTimer();
    is_running = false;
    is_paused = false;
    started = null;
    paused = null;
    config.on_end(doGetPosition());
  }

  function doStart () {
    if (is_running === true) {
      doStop();
    }
    is_running = true;

    started = getNow();
    startTimer();

    config.on_start();
  }

  function doStop () {
    config.on_stop(doGetPosition());
    doEnd();
  }

  function doPause () {
    if (is_running === true && is_paused === false) {
      stopTimer();
      is_paused = true;
      paused = getNow();
      config.on_pause(doGetPosition());
    }
  }

  function doResume () {
    if (is_running === true && is_paused === true) {
      started = started + (getNow() - paused);
      paused = null;
      is_paused = false;
      startTimer();
      config.on_resume(doGetPosition());
    }
  }

  function doFinish () {
    config.on_finish();
    doEnd();
  }

  function doTick () {
    const position = doGetPosition();
    config.on_tick(position);
    if (position === 1) {
      doFinish();
    }
  }

  function doGetPosition () {
    return calculatePosition(started, config.duration);
  }

  function doSetOptions (custom_config = {}) {
    config = sanitizeConfig(custom_config, config);
  }

  return  {
    start: doStart,
    stop: doStop,
    pause: doPause,
    resume: doResume,
    getPosition: doGetPosition,
    setOptions: doSetOptions
  };

}
