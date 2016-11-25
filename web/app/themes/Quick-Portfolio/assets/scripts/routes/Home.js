// jshint max-len:0
import anime from 'animejs';
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
    Logger.log('Final scripts running');

    class BrickAnimation {
      constructor() {
        this.elements = [];
      }

      randomDelay(el, index) {
        const key = 'delay';
        const value = ((-200 * index * (Math.random() + 0.8)) + 2000);
        return this.storeProperty(index, key, value);
      }

      storeProperty(index, key, value) {
        Logger.log(`The index is ${index}`);
        if (typeof this.elements[index] === 'undefined') {
          this.elements[index] = { [key]: value };
        } else if (typeof (this.elements[index].key) !== typeof (value)) {
          this.elements[index].key = value;
        }
        return this.elements[index].key;
      }

      animate() {
        /* eslint-disable object-shorthand, no-unused-vars */
        anime({
          targets: '.brick',
          direction: 'reverse',
          translateY: {
            value: '-100vw',
            delay: (el, index) => this.randomDelay(el, index),
            duration: 1200,
            easing: 'easeInExpo',
          },
          rotate: {
            value: function () { return anime.random(5, 180); },
            duration: 1000,
            delay: (el, index) => this.randomDelay(el, index),
          },
          complete: function () {
            Logger.log('We finished the animation');
          },
        });
        /* eslint-enable object-shorthand, no-unused-vars */
      }
    } /* BrickAnimation */
    const myAnimation = new BrickAnimation();
    myAnimation.animate();
  },
};
