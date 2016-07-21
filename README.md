# Animate

Bare bones animation helper.

[![npm](https://img.shields.io/npm/v/@fczbkk/animate.svg?maxAge=2592000)](https://www.npmjs.com/package/@fczbkk/animate)
[![npm](https://img.shields.io/github/license/fczbkk/animate.svg?maxAge=2592000)](https://github.com/fczbkk/animate/blob/master/LICENSE)
[![David](https://img.shields.io/david/fczbkk/animate.svg?maxAge=2592000)](https://david-dm.org/fczbkk/animate)
[![Travis](https://img.shields.io/travis/fczbkk/animate.svg?maxAge=2592000)](https://travis-ci.org/fczbkk/animate)

## How to use

Install the library via NPM:

```shell
npm install @fczbkk/animate --save
```

Then use in your project like this:

```javascript
import createAnimation from '@fczbkk/animate';

// animate left position of an element from 0px to 200px in 0.5s
const my_animation = createAnimation({
  duration: 500,
  onTick: updateElementPosition(position) {
    document.querySelector('#my_element').style.left =
      (position * 200) + 'px';
  }
});

my_animation.start();
```

## Documentation

### AnimationConfig

**Properties**

-   `easing` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Identifier of easing function.
-   `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Duration of animation in milliseconds.
-   `frequency` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Frequency of animation in milliseconds.
-   `on_start` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when animation starts.
-   `on_finish` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when animation finishes.
-   `on_stop` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when animation is stopped. Receives current position as parameter.
-   `on_end` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when animation ends for whatever reason (finish, stop). Receives current position as parameter.
-   `on_tick` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when animation ticks. Receives current position as parameter.
-   `on_pause` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when animation is paused. Receives current position as parameter.
-   `on_resume` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Function to be called when animation is resumed. Receives current position as parameter.

### Animation

Class representing the animation.

#### constructor

Create animation.

**Parameters**

-   `custom_config` **\[[AnimationConfig](#animationconfig)](default {})** 

#### start

Starts the animation. If the animation was running prior to starting, it will be stopped first.

#### stop

Stops running animation. If animation is not running, nothing happens.

#### pause

Pauses running animation. If animation is not running, nothing happens.

#### resume

Resumes paused animation. If animation is not paused, nothing happens.

#### getPosition

Returns current position of animation. If animation is not running, returns zero.

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Value between 0 (start) and 1 (end).

#### updateConfig

Updates animation config with new values. Unknown values will be ignored.

**Parameters**

-   `config` **\[[AnimationConfig](#animationconfig)](default {})** 

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/animate/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Animate is published under the [MIT license](https://github.com/fczbkk/animate/blob/master/LICENSE).
