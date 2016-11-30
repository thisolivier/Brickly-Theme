import anime from 'animejs';
import Logger from '../util/logger';

// The load post class which takes over from the natural Links
export default class LoadPost {
  static binder() {
    Logger.log('We have begun binding');
    document.onclick = function (e) {
      const e2 = e || window.event;
      const element = e2.target || e2.srcElement;
      if (element.tagName === 'A' && element.className === 'magicLink') {
        LoadPost.element = element;
        LoadPost.event = event;
        LoadPost.conductor();
        return false; // prevent default action and stop event propagation
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
      rotate: {
        value() {
          const random = (Math.floor(Math.random() * 2) ? -1 : 1) *
            (Math.floor(Math.random() * 490) + 300);
          return random;
        },
        easing: 'linear',
      },
      borderRadius: 8,
      duration() {
        return anime.random(300, 700); // Will set a random value from 50 to 100 to each divs
      },
    });
  }
  static implodePosts() {
    LoadPost.myExplosion.restart();
    LoadPost.myExplosion.pause();
  }

  static expandPost() {
  }
}
