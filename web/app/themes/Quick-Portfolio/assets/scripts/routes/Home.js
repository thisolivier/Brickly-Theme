// jshint max-len:0
import anime from 'animejs';
import Ellipsis from 'ftellipsis';
import 'jquery';
import Logger from '../util/logger';

export default {
  init() {
    class ChimneyStack {
      // The script which modified the posts so they can be laid out like a brick wall
      constructor() {
        this.index = { brick: 1, articles: 1 };
        this.append = [];
        this.pattern = {
          open: ['b', 's'],
          repeat: ['s', 'b', 'b', 's'],
        };
        this.brickClass = {
          b: 'big_brick brick',
          s: 'small_brick brick',
        };
        // Finds my articles, stores them and removes them from the DOM
        this.$articles = $('main').children('article').detach();
        Logger.log('begin');
      }

      // Runs through the pattern, ensuring min and max repetitions
      conductor() {
        this.usePattern('open');
        let emergencyStop = 0;
        while (this.index.articles || this.append.length < 13) {
          this.usePattern('repeat');
          if (emergencyStop > 15) { Logger.log('Emergency stop'); break; }
          emergencyStop += 1;
        }
        // At last, we inserts the result back into the DOM
        $('main').append(this.append);
      }

      // Is passed a section of the pattern, and works though its items
      usePattern(key) {
        for (const current of this.pattern[key]) {
          const newbie = (key === 'open') || (!this.index.articles) ?
            this.divHollow(current) : this.divBespoke(current);
          this.append.push(newbie);
        }
      }

      // Creates an empty div (brick) with class approprite to the pattern
      divHollow(template) {
        const newbie = document.createElement('div');
        $(newbie).html('&nbsp').addClass(this.brickClass[template]);
        newbie.setAttribute('aria-hidden', 'true');
        return newbie;
      }

      // Inserts either a hollow brick or an article brick
      divBespoke(element) {
        const virgin = this.index.brick;
        // The kiln can produce hollow brick, or one with an article.
        const kiln = {
          full: () => {
            const newbie = this.$articles.eq(this.index.articles - 1);
            this.index.brick = 0;
            if (newbie.length) {
              this.index.articles += 1;
              newbie.addClass(this.brickClass[element]);
              return newbie;
            }
            this.index.articles = 0;
            return kiln.hollow();
          },
          hollow: () => this.divHollow(element),
        };
        // If this is a chance for an article, have think,
        // If we're a virgin, or if the odds are good, insert an article.
        // Failing any of that, make a hollow brick.
        return ((element === 'b') && (virgin || (Math.random() > 0.35)) ?
          kiln.full() : kiln.hollow()
        );
      }
    }

    const chim = new ChimneyStack();
    Logger.log(chim.conductor());
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

      addListener() {
        window.addEventListener('scroll', this.adjust());
      }

      adjust() {
        const scrollPercent = window.scrollTop /
          (this.target.parent.scrollHeight - window.clientHeight);
        console.log(`We begin with the window.scrollTop of ${window.scrollTop} `);
        console.log(`Next we encountered this.target.parent.scrollHeight, ${this.target.parent.scrollHeight} `);
        console.log(`Finally, the clientHeight of window... ${window.clientHeight} `);
        const skyMargin = -5;

        let newSkyMargin = -10;
        let newSky = this.proportions.sky - 20;
        let newLand = this.proportions.sky + 20 + (newSkyMargin * -1) + skyMargin;

        newSky = `${newSky * scrollPercent}%`;
        newLand = `${newLand * scrollPercent}%`;
        newSkyMargin = `${newSkyMargin * scrollPercent}vh`;

        this.target.sky.css('height', newSky);
        this.target.sky.css('margin-bottom', newSkyMargin);
        this.target.land.css('height', newLand);
      }
    }
    const horizon = new BackgroundLanscape('.backgroundLanscape');
    horizon.addListener();
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
