import anime from 'animejs';
import Logger from '../util/logger';

export default class BrickAnimation {
  // The methods in here seem to be working,
  // except the animations are not being applied to the elements
  // I'm trying to call the animate function on the window

  static animate() {
    /* eslint-disable object-shorthand, no-unused-vars, no-undef */
    this.anime = anime({
      targets: '.brick',
      direction: 'reverse',
      translateY: {
        value: '-100vw',
        delay(el, index) {
          Logger.log(`our index is index ${index}`);
          const key = 'delay';
          const value = ((-200 * index * (Math.random() + 0.8)) + 2000);
          /* eslint no-param-reassign: ["error", { "props": false }] */
          el.storeProperty = { [index]: { [key]: value } };
          return el.storeProperty[index][key];
        },
        duration: 1200,
        easing: 'easeInExpo',
      },
      rotate: {
        value: function () {
          return anime.random(30, 360);
        },
        duration: 1000,
        delay(el, index) {
          const key = 'delay';
          return el.storeProperty[index][key];
        },
      },
      complete: function () {
      },
    });

    /* eslint-enable object-shorthand, no-unused-vars, no-undef */
  }
}
