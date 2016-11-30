import 'jquery';
import anime from 'animejs';
// import Logger from '../util/logger';

export default class BrickAnimation {
  // The methods in here seem to be working,
  // except the animations are not being applied to the elements
  // I'm trying to call the animate function on the window

  static animate() {
    /* eslint-disable object-shorthand, no-unused-vars, no-undef */
    const targets = $('.brick').toArray().reverse();
    let delayTot = 0;
    this.anime = anime({
      targets: targets,
      direction: 'reverse',
      translateY: {
        value: '-100vw',
        delay(el, index) {
          const key = 'delay';
          const value = (300 * (Math.random() + 0.2));
          delayTot += value;
          return delayTot;
        },
        duration: 1200,
        easing: 'easeInExpo',
      },
    });

    /* eslint-enable object-shorthand, no-unused-vars, no-undef */
  }
}
