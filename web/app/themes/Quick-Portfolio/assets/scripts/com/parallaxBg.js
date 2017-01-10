// import anime from 'animejs';
// import Logger from '../util/logger';

export default class BackgroundLanscape {
  constructor() {
    this.target = $('.backgroundLanscape');
    this.heightDefined = $('#heightDefined');
    this.target = {
      parent: this.target,
      sky: this.target.find('.sky'),
      land: this.target.find('.land'),
    };
    this.proportions = {
      sky: this.getHeightInPercent.call(this.target.sky),
      land: this.getHeightInPercent.call(this.target.land),
    };
  }

  init() {
    this.adjust(window);
    $('.backgroundLanscape').first().removeClass('hidden');
    $(window).scroll(() => this.adjust(window));
  }

  getHeightInPercent() {
    return parseFloat($(this).css('height')) / parseFloat($(this).parent().css('height'));
  }

  adjust(window) {
    const clientHeight = window.innerHeight;
    const totalHeight = this.heightDefined.height();
    const scrollTop = $(window).scrollTop();
    const heightOffset = totalHeight - (clientHeight / 2);
    const scrollPercent = scrollTop / heightOffset;

    if (heightOffset - scrollTop >= 0) {
      const skyMargin = 0.1;
      let newSkyMargin = skyMargin * scrollPercent;
      let newLand = (this.proportions.land + 0.4) -
        ((0.4 - newSkyMargin) * scrollPercent);

      newSkyMargin = `${(newSkyMargin) * -100}vh`;
      newLand = `${newLand * 100}vh`;
      this.target.sky.css('margin-top', newSkyMargin);
      this.target.land.css('height', newLand);
    }
  } // adjust(window)
}
