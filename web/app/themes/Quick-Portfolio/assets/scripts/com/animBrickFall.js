import anime from 'animejs';
import Logger from '../util/logger';

export default class BrickAnimation {
  // The methods in here seem to be working,
  // except the animations are not being applied to the elements
  // I'm trying to call the animate function on the window
  constructor() {
    this.elements = [];
    Logger.log('begin', 'the falling sky bricks');
  }

  randomDelay(el, index) {
    const key = 'delay';
    const value = ((-200 * index * (Math.random() + 0.8)) + 2000);
    return this.storeProperty(index, key, value);
  }

  storeProperty(index, key, value) {
    if (typeof this.elements[index] === 'undefined') {
      this.elements[index] = { [key]: value };
    } else if (typeof (this.elements[index].key) !== typeof (value)) {
      this.elements[index].key = value;
    }
    return this.elements[index].key;
  }

  animate() {
    /* eslint-disable object-shorthand, no-unused-vars */
    anime({
      targets: '.brick',
      direction: 'reverse',
      translateY: {
        value: '-100vw',
        delay: (el, index) => this.randomDelay(el, index),
        duration: 1200,
        easing: 'easeInExpo',
      },
      rotate: {
        value: function () { return anime.random(5, 180); },
        duration: 1000,
        delay: (el, index) => this.randomDelay(el, index),
      },
      complete: function () {
      },
    });
    /* eslint-enable object-shorthand, no-unused-vars */
  }
}
