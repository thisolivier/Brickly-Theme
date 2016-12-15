import 'jquery';
import anime from 'animejs';
// import Logger from '../util/logger';

export default class BrickAnimation {
  static makeMainVisible() {
    $('main.main, .mortar').removeClass('hidden');
  }
  static animBrickFall() {
    let delayTot = 0;
    this.anime = anime({
      direction: 'reverse',
      easing: 'easeOutQuart',
      targets: $('.brick').toArray().reverse(),
      translateY: el => el.getBoundingClientRect().bottom * -0.7,
      opacity: {
        value: [1, 0],
        easing: 'easeOutExpo',
      },
      delay(el) {
        const value = (
          (el.getBoundingClientRect().bottom * 0.1)
        );
        delayTot += value;
        return (delayTot);
      },
      duration(el) {
        return (anime.random(1, 4) + ((el.getBoundingClientRect().bottom) * 0.5));
      },
      begin: BrickAnimation.makeMainVisible(),
    });
  }
}
