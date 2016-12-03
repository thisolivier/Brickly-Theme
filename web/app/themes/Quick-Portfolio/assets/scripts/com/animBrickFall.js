import 'jquery';
import anime from 'animejs';
// import Logger from '../util/logger';

export default class BrickAnimation {
  static animate() {
    /* eslint-disable object-shorthand, no-unused-vars, no-undef */
    const targets = $('.brick').toArray().reverse();
    let delayTot = 0;
    this.anime = anime({
      targets: targets,
      direction: 'reverse',
      translateY: {
        value(el) {
          return (el.getBoundingClientRect().bottom * -1);
        },
        delay(el, index) {
          const key = 'delay';
          const value = (
            (el.getBoundingClientRect().bottom * 0.2) +
            (el.getBoundingClientRect().bottom * ((Math.random() * 0.1) - 0.05))
          );
          delayTot += value;
          return (delayTot);
        },
        duration(el, index) {
          return (el.getBoundingClientRect().bottom) * 0.9;
        },
        easing: 'easeInQuart',
      },
    });
    /* eslint-enable object-shorthand, no-unused-vars, no-undef */
  }
}
