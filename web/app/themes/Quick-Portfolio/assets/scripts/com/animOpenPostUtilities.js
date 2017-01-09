import Logger from '../util/logger';
// import varDump from '../util/varDump';

export default class TransitionUtilities {
  /* eslint no-param-reassign: "warn", class-methods-use-this: "warn" */
  constructor() {
    this.$toBind = $('.magicLink');
    this.$cloud = $('#theCloud');
    this.$cloudLink = $('#cloudLink');
    this.$closePost = $('.closePost');
    this.$main = $('main');
    this.originalCloudText = $('#cloudLink').html();
    this.originalTitle = $(document).find('title').text();
    this.color = { current: 'white', next: 'black' };
    this.cloneCheck = true;
    this.c = document.getElementById('backgroundPost');
    this.cxt = this.c.getContext('2d');
    this.cH = 0;
    this.cW = 0;
    this.animations = [];
    this.circles = [];
  }

  init() {
    this.resizeCanvas();
    this.addMethods(); // Adds methods on bricks and circles to be called when animating
    window.addEventListener('resize', this.resizeCanvas);
    this.addClickListeners(this.$toBind); // Adds triggers - animations will add to queue.
    this.animate(); // Begins animation engine - implaments queue.
  }

  addClickListeners(toBind, bindFunc = this.handleEvent) {
    const handleEvent = bindFunc;
    this.handle = e => handleEvent.call(this, e);
    const bind = (i, x) => {
      x.addEventListener('touchstart', this.handle);
      x.addEventListener('click', this.handle);
    };
    if (toBind instanceof jQuery) {
      $(toBind).each((i, x) => bind(i, x));
    } else { bind(0, toBind); }
  }

  handleEvent(e) {
    // Fix for touch events and IE 9
    const event = e.touches ? e.touches[0] : e || window.event;
    const eventTarget = e.target || e.srcElement;

    // Store info about the event
    this.eventInfo = {
      event,
      eventTarget,
      pageX: event.pageX,
      pageY: event.pageY - $(window).scrollTop(),
      scrollTop: $(window).scrollTop(),
      newPage: $(eventTarget).closest('article'),
      rippleSize: Math.min(200, (this.cW * 0.4)),
      minCoverDuration: 750,
      targetR: Math.sqrt(
        Math.pow(Math.max(event.pageX - 0, this.cW - event.pageX), 2) +
        Math.pow(Math.max(event.pageY - 0, this.cH - event.pageY), 2)
      ),
    };
    this.eventToggle('open');
  }

  setPageUrl($brick = 0) {
    if ($brick) {
      const newTitle = `Olivier's ${$brick.find('h2 .magicLink').html()}`;
      const locationURL = $brick.find('h2 .magicLink')[0];
      Logger.log(`Setting a new state, with the title ${newTitle}, and the location ${locationURL}`);
      history.pushState({ loading: newTitle }, newTitle, locationURL);
      window.onpopstate = () => this.eventToggle('close');
    } else {
      window.onpopstate = () => this.openPost2();
    }
  }

  resetAndPrime(targets, classesRemove = 0, classesAdd = 0, resetStyle = 1) {
    if (resetStyle) $(targets).removeAttr('style');
    if (classesRemove) $(targets).removeClass(classesRemove);
    if (classesAdd) $(targets).addClass(classesAdd);
  }

  resizeCanvas() {
    this.cW = window.innerWidth;
    this.cH = window.innerHeight;
    $(this.c).attr('width', `${this.cW * window.devicePixelRatio}px`);
    $(this.c).attr('height', `${this.cH * window.devicePixelRatio}px`);
  }

  Circle(opts) {
    Object.assign(this, opts);
  }

  addMethods() {
    this.Circle.prototype.draw = function (cxt) {
      cxt.globalAlpha = this.opacity || 1;
      cxt.beginPath();
      cxt.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      if (this.fill) {
        cxt.fillStyle = this.fill;
        cxt.fill();
      }
      cxt.closePath();
      cxt.globalAlpha = 1;
    };
  }
}
