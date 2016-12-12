export default class BackgroundLanscape {
  constructor(targetClass) {
    this.target = $(targetClass);
    this.target = {
      parent: this.target,
      sky: this.target.find('.sky'),
      land: this.target.find('.land'),
    };
    this.getHeightInPercent = function () {
      return parseFloat($(this).css('height')) / parseFloat($(this).parent().css('height'));
    };
    this.proportions = {
      sky: this.getHeightInPercent.call(this.target.sky),
      land: this.getHeightInPercent.call(this.target.land),
    };
  }

  adjust(window) {
    const clientHeight = window.innerHeight;
    const scrollHeight = $('#heightDefined').height();
    const scrollPercent = $(window).scrollTop() /
      (scrollHeight - clientHeight);
    const skyMargin = 0.1;

    let newSkyMargin = skyMargin * scrollPercent;
    let newLand = (this.proportions.land + 0.4) -
      ((0.4 - newSkyMargin) * scrollPercent);
    newSkyMargin = `${(newSkyMargin) * -100}vh`;
    newLand = `${newLand * 100}vh`;
    this.target.sky.css('margin-top', newSkyMargin);
    this.target.land.css('height', newLand);
  }
}
