import anime from 'animejs';
import Logger from '../util/logger';

// The load post class which takes over from the natural Links
export default class LoadPost {
  static binder() {
    Logger.log('We have begun binding');
    document.onclick = function (e) {
      const e2 = e || window.event;
      const element = e2.target || e2.srcElement;
      if (element.className === 'magicLink') {
        LoadPost.element = element;
        LoadPost.event = event;
        LoadPost.conductor();
      }
      return true;
    };
  }
  static conductor() {
    Logger.log(`We encounter ${$(LoadPost.element).text()}`);
    const newPage = $(LoadPost.element).closest('article');
    const classBig = 'current_post';
    const newFunc = () => {
      if (!newPage.hasClass(classBig)) {
        newPage.addClass(classBig);
        LoadPost.explodePosts();
        LoadPost.expandPost(newPage);
      } else {
        newPage.removeClass(classBig);
        LoadPost.implodePosts();
      }
    };
    newFunc();
  }
  static explodePosts() {
    LoadPost.myExplosion = anime({
      easing: 'linear',
      targets: document.querySelectorAll('.brick:not(.current_post)'),
      translateX() {
        const random = (Math.floor(Math.random() * 2) ? -1 : 1) *
          (Math.floor(Math.random() * 600) + 600);
        return random;
      },
      translateY() {
        const random = (Math.floor(Math.random() * 2) ? -1 : 1) *
          (Math.floor(Math.random() * 300) + 600);
        return random;
      },
      rotate: 720,
      duration() {
        return anime.random(300, 700); // Will set a random value from 50 to 100 to each divs
      },
    });
  }
  static implodePosts() {
    LoadPost.myExplosion.restart();
    LoadPost.myExplosion.pause();
  }

  static expandPost($brick) {
    Logger.log($brick[0]);
    const currentPos = $brick[0].getBoundingClientRect();
    const currentDim = {
      x: currentPos.right - currentPos.left,
      y: currentPos.bottom - currentPos.top,
    };
    const $clone = $brick.clone(false);
    $clone.attr('id', 'bigBaby');
    $clone.css({
      height: currentDim.y,
      width: currentDim.x,
      display: 'block',
      top: currentPos.top,
      left: currentPos.left,
      zIndex: 200,
      positon: 'absolute',
    });
    $clone.appendTop('body');
  }
}
