import 'jquery';
import anime from 'animejs';
// import Logger from '../util/logger';

export default class BrickAnimation {
  static animate() {
    /* eslint-disable object-shorthand, no-unused-vars, no-undef */
    const targets = $('.brick').toArray().reverse();
    let delayTot = 0;
    this.anime = anime({
      direction: 'reverse',
      easing: 'easeOutQuart',
      targets: targets,
      translateY(el) {
        return (el.getBoundingClientRect().bottom * -1);
      },
      delay(el, index) {
        const key = 'delay';
        const value = (
          (el.getBoundingClientRect().bottom * 0.1) +
          (el.getBoundingClientRect().bottom * ((Math.random() * 0.2) - 0.05))
        );
        delayTot += value;
        return (delayTot);
      },
      duration(el, index) {
        return (10 + ((el.getBoundingClientRect().bottom) * 0.9));
      },
    });
    /* eslint-enable object-shorthand, no-unused-vars, no-undef */
  }
}
