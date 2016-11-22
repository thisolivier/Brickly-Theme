export default {
  init() {
    function logger(printMe) {
      const i = this.index.log;
      this.index.log += 1;
      let nowTime = new Date();
      nowTime = `${nowTime.getMinutes()}.${nowTime.getSeconds()}`;
      const prefix = `## Captain's log, stardate ${i}:${nowTime} ->`;
      if (printMe) {
        console.log(`${prefix} ${printMe} ##`);
      } else {
        console.log(`${prefix} Space is vast and empty (-__-) ##`);
      }
    }

    class ChimneyStack {
      constructor() {
        this.index = { log: 0, brick: 1 };
        this.append = [];
        this.pattern = { open: ['b', 's'], repeat: ['s', 'b'] };
        this.brickSizes = { b: 'big_brick', s: 'small_brick' };
        this.$articles = $('main').children('article');
      }
      elementCreator(template) {
        const newbie = document.createElement('div');
        newbie.setAttribute('class', this.brickSizes[template]);
        newbie.setAttribute('aria-hidden', 'true');
        return newbie;
      }
      usePattern(key) {
        for (const current of this.pattern[key]) {
          const newbie = (key === 'open') || (this.$articles.length === 0) ?
            this.elementCreator(current) : this.factory(current);
          this.append.push(newbie);
        }
      }
      factory(element) {
        const kiln = {
          virgin: this.index.brick,
          full: () => {
            const newbie = this.$articles.eq(0);
            this.$articles = this.$articles.splice(0, 1);
            this.index.brick = 0;
            return newbie;
          },
          hollow: () => this.elementCreator(element),
        };
        return (((element === 'b') && (Math.random() > 0.3)) || !kiln.virgin ?
          kiln.full() : kiln.hollow()
        );
      }
    }

    const chim = new ChimneyStack();
    logger.call(chim, chim.usePattern('open'));

    /* THE PLAN

YES      create template empty elements, big (Be) and small (Ba)
YES      find articles, store number
YES      enable debugging and test articles have been found
NA      pattern now = BaBaBaBaBa...n(articles)
YES      Create pattern ref = SeBa,BoSe,SeBo,BoSe
YES      Create new object, Store BeSe then begin adding elements according to the pattern,
YES      If element is Bo, .33 probability of becoming Ba,
YES      If element is Ba, use next article instead of template element
    */
  },
  finalize() {
    // JavaScript to be fired on the home page, after the init JS
  },
};
