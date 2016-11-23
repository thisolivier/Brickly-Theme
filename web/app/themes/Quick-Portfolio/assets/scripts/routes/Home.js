// jshint max-len:0

export default {
  init() {
    class Logger {
      static log(printMe) {
        this.index = !this.index ? 1 : this.index += 1;
        // const pad = number => (number <= 99 ? (`000${number}`).slice(-2) : number);
        const indexAPI = this.index;
        const nowTime = new Date();
        const prefix = `## Captain's log, stardate ${indexAPI}.${nowTime.getMilliseconds()} ->`;
        if (printMe === 'begin') {
          Logger.print(prefix, 'Our destination is the great, unexplored mass of the galaxy.');
        } else if (printMe) {
          Logger.print(prefix, printMe);
        } else {
          Logger.print(prefix, 'Space is vast and empty (-__-)');
        }
      }
      static print(prefix, printMe) {
        console.log(`${prefix} ${printMe}`);
      }
    }

    class ChimneyStack {
      constructor() {
        this.index = { brick: 1, articles: 0 };
        this.append = [];
        this.pattern = { open: ['b', 's'], repeat: ['s', 'b'] };
        this.brickClass = { b: 'big_brick', s: 'small_brick' };
        this.$articles = $('main').children('article').detach();
        Logger.log('begin');
      }

      conductor() {
        this.usePattern('open');
        let emergencyStop = 0;
        while (this.append.length < 13) {
          this.usePattern('repeat');
          if (emergencyStop > 15) { Logger.log('Emergency stop'); break; }
          emergencyStop += 1;
        }
        $('main').append(this.append);
      }

      usePattern(key) {
        Logger.log(`We are on the ${key} set`);
        for (const current of this.pattern[key]) {
          const newbie = (key === 'open') || (this.$articles.length === 0) ?
            this.divHollow(current) : this.divBespoke(current);
          this.append.push(newbie);
        }
      }

      divHollow(template) {
        const newbie = document.createElement('div');
        $(newbie).addClass(this.brickClass[template]);
        newbie.setAttribute('aria-hidden', 'true');
        return newbie;
      }

      divBespoke(element) {
        const virgin = this.index.brick;
        const kiln = {
          full: () => {
            const newbie = this.$articles.eq(this.index.articles);
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

        return (virgin || ((element === 'b') && (Math.random() > 0.35) && this.index.articles) ?
          kiln.full() : kiln.hollow()
        );
      }
    }

    const chim = new ChimneyStack();
    Logger.log(chim.conductor());
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
};
