// import Logger from '../util/logger';
import Animations from './animOpenPostAnimations';

export default class PageTransitions extends Animations {
  openPost($brick) {
    if (this.cloneCheck) {
      this.primeBackButton($brick);
      this.cloneCheck = false;
      this.$clone = $brick.clone(true, true);
      this.$clone.addClass('invisible');
      const cloudText = this.$clone.find('.magicLink').first().html();
      this.funcCloudTextChange(cloudText);
      this.funcCloudScale();
      this.$main.css('z-index', 50);
      this.$clone.removeAttr('style').attr('id', 'bigBaby')
        .find('header').first()
        .detach();
      this.$clone.find('.shadow').first().detach();
      this.addClickListeners(this.$clone);
      this.addClickListeners(this.$cloudLink);
      this.$clone.appendTo('#heightDefined');
      this.$clone.removeClass('invisible');
      $('body').addClass('post-open');
    }
  }

  closePost() {
    this.funcCloudTextChange();
    history.pushState({ loading: 'home' }, this.originalTitle, '/');
    this.cloneCheck = true;
    this.$clone.detach();
    this.$main.removeClass('hidden invisible').removeAttr('style');
    $('article').removeClass('transitions');
    this.removeAnimation(this.animBg);
    this.removeAnimation(this.animScale);
    this.removeAnimation(this.animBrick);
    this.animBg.revert();
    this.animScale.revert();
    this.animBrick.revert();
    this.animations.push(this.animScale, this.animBrick, this.animBg);
    this.$cloudLink[0].removeEventListener('click', this.handle);
    $('body').removeClass('post-open');
  }
}
