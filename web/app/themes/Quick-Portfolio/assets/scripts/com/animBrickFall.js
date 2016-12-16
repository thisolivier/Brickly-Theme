import 'jquery';
import anime from 'animejs';
// import Logger from '../util/logger';

export default class BrickAnimation {
  init() {
    let delayTot = 0;
    const makeMortar = function () {
      $('.mortar').removeClass('pre_setup');
    };
    const removeStyles = () => {
      $('.brick').removeAttr('style');
    };
    this.anime = anime({
      direction: 'reverse',
      easing: 'easeInQuint',
      targets: $('.brick').toArray().reverse(),
      translateY() { return `-${anime.random(600, 700)}px`; },
      opacity: {
        value: [1, 0],
        easing: 'easeInExpo',
      },
      delay(el) {
        const value = (
          (el.getBoundingClientRect().bottom * anime.random(0.1, 0.13))
        );
        delayTot += value;
        return (delayTot);
      },
      duration() {
        return (anime.random(700, 800));
      },
      begin() {
        $('main.main').removeClass('hidden');
        makeMortar();
      },
      complete() {
        removeStyles();
      },
    });
  }
}
