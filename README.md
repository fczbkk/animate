# Animate

Bare bones animation helper.

[![npm](https://img.shields.io/npm/v/element-monitor.svg?maxAge=2592000)](https://www.npmjs.com/package/@fczbkk/animate)
[![npm](https://img.shields.io/npm/l/element-monitor.svg?maxAge=2592000)](https://github.com/fczbkk/animate/blob/master/LICENSE)
[![David](https://img.shields.io/david/fczbkk/element-monitor.svg?maxAge=2592000)](https://david-dm.org/fczbkk/animate)
[![Travis](https://img.shields.io/travis/fczbkk/element-monitor.svg?maxAge=2592000)](https://travis-ci.org/fczbkk/animate)

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

### AnimationInterface

Interface of the animation object.

**Parameters**

-   `custom_config`   (optional, default `{}`)

**Properties**

-   `start` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Starts the animation.
-   `stop` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Stops the animation.
-   `pause` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Pauses the animation. When resumed, it will continue at the same spot it was paused. Can only be paused when running.
-   `resume` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Resumes the animation. Can only be resumed when paused.
-   `getPosition` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Returns current animation position, which is number between 0 and 1.
-   `setOptions` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Updates animation options, e.g. duration, frequency. Accepts AnimationConfig object as a parameter.

### createAnimation

**Parameters**

-   `custom_config` **\[[AnimationConfig](#animationconfig)](default {})** 

Returns **[AnimationInterface](#animationinterface)** 

### AnimationConfig

**Properties**

-   `easing` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** ='linear' - Easing function to be used.
-   `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** =300 - Duration of animation in milliseconds.
-   `frequency` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** =10 - Frequency of animation redraws in milliseconds.

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/animate/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Animate is published under the [MIT license](https://github.com/fczbkk/animate/blob/master/LICENSE).
