// jshint max-len:0
import anime from 'animejs';
import Ellipsis from 'ftellipsis';
import 'jquery';
import Logger from '../util/logger';
import FillCanvas from '../com/fillcanvas';
import FillCanvas from '../com/fillcanvas';

export default {
  init() {
    const chim = new ChimneyStack();
    Logger.log(chim.conductor());

    // The load post class which takes over from the natural Links
    class LoadPost {
      constructor() {
        Logger.log('begin', 'the exploding fortress');
      }
      static binder() {
        Logger.log('We have begun binding');
        document.onclick = function (e) {
          const e2 = e || window.event;
          const element = e2.target || e2.srcElement;
          if (element.tagName === 'A' && element.className === 'magicLink') {
            this.element = element;
            this.event = event;
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
    LoadPost.binder();
    Logger.log();
  },

  finalize() {
    class BackgroundLanscape {
      constructor(targetClass) {
        Logger.log('begin', 'the distant background');
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
        let newLand = this.proportions.land -
          ((0.4 - newSkyMargin) * scrollPercent);
        newSkyMargin = `${(newSkyMargin) * -100}vh`;
        newLand = `${newLand * 100}%`;
        this.target.sky.css('margin-top', newSkyMargin);
        this.target.land.css('height', newLand);
      }
    }
    const horizon = new BackgroundLanscape('.backgroundLanscape');
    /* eslint-disable*/
    $(window).scroll(function(){
      horizon.adjust(window);
    });
    /* eslint-enable*/
    Logger.log();

    class EllipsisJS {
      static go(index, element) {
        const ellipsis = new Ellipsis(element);

        ellipsis.calc();
        ellipsis.set();
      }
    }
    $('.tags').each(function (index) { EllipsisJS.go(index, this); });

    /* eslint-disable object-shorthand, no-unused-vars */
    const animateBrick = anime({
      targets: '.brick',
      delay: function (el, index) { return ((Math.random() + 0.8) * index * -200) + 2000; },
      direction: 'reverse',
      translateY: {
        value: '-100vw',
        duration: 1200,
        easing: 'easeInExpo',
      },
      rotate: {
        value: function () { return anime.random(5, 180); },
        duration: 1000,
      },
      complete: function () {
        Logger.log('We finished the animation');
      },
    });
    /* eslint-enable object-shorthand, no-unused-vars */
  },
};
