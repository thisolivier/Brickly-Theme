import Logger from '../util/logger';
import Animations from './animOpenPostAnimations';

export default class PageTransitions extends Animations {
  eventToggle(event, eventTarget) {
    Logger.log('begin', eventTarget);
    if (this.eventInfo.newPage.is('#pageTransition')) {
      this.explodeDecorative();
    } else if ($(eventTarget).is('.closePost')) { // CHANGE CLOUD LINK TO A CLASS FOR HOME LINKS
      event.preventDefault();
      this.destroyContent();
      this.resetAndPrime($('article'), 'transitions', 0, 0);
      this.cloudRetract();
      this.implodeBricks();
    } else if (this.cloneCheck) {
      event.preventDefault();
      const $brick = this.eventInfo.newPage;
      this.grabContent($brick);
      const cloudText = this.$clone.find('.magicLink').first().html();
      this.cloudExpand(cloudText);
      this.injectContent($brick);
    }
  }

  grabContent($brick) {
    this.$clone = $brick.clone(true, true);
    this.$clone.addClass('invisible');
    this.cloneCheck = false;
  }

  injectContent($brick) {
    this.setPageUrl($brick);
    this.$main.css('z-index', 50);
    this.$clone.removeAttr('style').attr('id', 'pageTransition')
      .find('header').first()
      .detach();
    this.$clone.find('.shadow').first().detach();
    this.addClickListeners(this.$clone);
    this.addClickListeners(this.$cloudLink);
    this.$clone.appendTo('#heightDefined');
    this.$clone.removeClass('invisible');
    $('body').addClass('post-open');
  }

  destroyContent() {
    this.setPageUrl();
    this.$cloudLink[0].removeEventListener('click', this.handle);
    this.$clone.detach();
    this.cloneCheck = true;
    this.resetAndPrime(this.$main, 'hidden invisible', 0);
    $('body').removeClass('post-open');
  }
}
