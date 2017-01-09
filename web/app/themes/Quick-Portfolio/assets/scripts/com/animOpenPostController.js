import Logger from '../util/logger';
import Animations from './animOpenPostAnimations';
// import varDump from '../util/varDump';

export default class PageTransitions extends Animations {
  eventToggle(whatToDo, eventInfo) {
    if (whatToDo === 'close') {
      this.closePost(eventInfo);
    } else if ((whatToDo === 'open') && this.cloneCheck) {
      Logger.log('begin', 'the post opener');
      eventInfo.event.preventDefault();
      this.openPost(eventInfo);
      Logger.log();
    }
  }

  openPost(eventInfo) {
    this.grabContent(eventInfo);
    const cloudText = this.$clone.find('.magicLink').first().html();
    this.setPageUrl(eventInfo);
    this.cloudExpand(cloudText);
    this.explodeBricks(eventInfo);
    this.injectContent();
    this.addClickListeners(this.$clone);
    this.addClickListeners(this.$closePost, this.handleClose);
  }

  closePost(eventInfo) {
    this.setPageUrl(eventInfo, 'close');
    this.destroyContent(eventInfo);
    this.resetAndPrime($('article'), 'transitions', 0, 0);
    this.cloudRetract();
    this.implodeBricks();
  }

  grabContent(eventInfo) {
    this.$clone = eventInfo.newPage.clone(true, true);
    this.$clone.addClass('invisible');
    this.cloneCheck = false;
  }

  injectContent() {
    $('html, body').animate({ scrollTop: 0 }, 1000);
    this.$main.css('z-index', 50);
    this.$clone.removeAttr('style').attr('id', 'loadedPage')
      .find('header').first()
      .detach();
    this.$clone.find('.shadow').first().detach();
    this.$clone.appendTo('#heightDefined');
    this.$clone.removeClass('invisible');
    $('body').addClass('post-open');
  }

  destroyContent(eventInfo) {
    $('html, body').animate({ scrollTop: eventInfo.scrollTop }, 500);
    // this.$cloudLink[0].removeEventListener('click', this.handle);
    this.$clone.detach();
    this.cloneCheck = true;
    this.resetAndPrime(this.$main, 'hidden invisible', 0);
    $('body').removeClass('post-open');
  }
}
