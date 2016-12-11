import anime from 'animejs';
import Logger from '../util/logger';

export default class FillCanvas {
  /* eslint no-param-reassign: "warn", class-methods-use-this: "warn" */
  constructor() {
    this.c = document.getElementById('backgroundPost');
    this.cxt = this.c.getContext('2d');
    this.cH = 0;
    this.cW = 0;

    this.$toBind = $('.magicLink');
    this.$cloud = $('#theCloud');
    this.$cloudLink = $('#cloudLink');
    this.originalCloudText = $('#cloudLink').html();
    this.color = { current: 'white', next: 'black' };
    this.cloneCheck = true;
    this.animations = [];
    this.circles = [];
  }

  init() {
    Logger.log('begin', 'the expand function');
    this.resizeCanvas(); // Fix me, scoping errors
    this.addMethods(); // Adds methods on bricks and circles to be called when animating
    window.addEventListener('resize', this.resizeCanvas);
    this.addClickListeners(this.$toBind); // Adds triggers - animations will add to queue.
    this.animate(); // Begins animation engine - implaments queue.
  }

  resizeCanvas() {
    this.cW = window.innerWidth;
    this.cH = window.innerHeight;
    $(this.c).attr('width', `${this.cW * window.devicePixelRatio}px`);
    $(this.c).attr('height', `${this.cH * window.devicePixelRatio}px`);
    $(this.cxt).css('transform', `scale(${window.devicePixelRatio})`);
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

  addClickListeners(toBind) {
    const handleEvent = this.handleEvent;
    const bind = (i, x) => {
      x.addEventListener(
        'touchstart',
        e => handleEvent.call(this, e)
      );
      x.addEventListener(
        'click',
        e => handleEvent.call(this, e)
      );
    };
    if (toBind instanceof jQuery) {
      $(toBind).each((i, x) => bind(i, x));
    } else {
      bind(0, toBind);
    }
  }

  handleEvent(e) {
    // Stop natural click event
    e.preventDefault();
    // Correct the event if it's a tap
    if (e.touches) {
      e = e.touches[0];
    } else {
      e = e || window.event;
    }
    // Fix for IE < 9
    const element = e.target || e.srcElement;
    const newPage = $(element).closest('article');
    const targetR = Math.sqrt(
      Math.pow(
        Math.max(e.pageX - 0, this.cW - e.pageX), 2
      ) + Math.pow(
        Math.max(e.pageY - 0, this.cH - e.pageY), 2
      )
    );
    const rippleSize = Math.min(200, (this.cW * 0.4));
    const minCoverDuration = 750;
    Logger.log(e.pageX);
    Logger.log(e.pageY);
    // Create radial BG animation
    const funcBgFiller = function () {
      // Create page filling obj and animation
      this.pageFill = new this.Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: this.color.next,
      });
      this.animBg = anime({
        targets: this.pageFill,
        r: targetR,
        duration: Math.max(targetR / 2, minCoverDuration),
        easing: 'easeInCubic',
      });
      this.animations.push(this.animBg);
    }.bind(this);

    // Create ripple obj and animation
    const funcRipple = function () {
      this.ripple = new this.Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: this.color.current,
        stroke: {
          width: 3,
          color: this.color.current,
        },
        opacity: 1,
      });
      this.animRipple = anime({
        targets: this.ripple,
        r: rippleSize,
        opacity: {
          value: 0,
          delay: 200,
          duration: 500,
        },
        easing: 'easeOutExpo',
        duration: 700,
        complete: this.removeAnimation(this.animRipple),
      });
      this.animations.push(this.animRipple);
    }.bind(this);

    // Create particle objects and animation
    const funcParticles = function () {
      this.particles = [];
      for (let i = 0; i < 20; i += 1) {
        const particle = new this.Circle({
          x: e.pageX,
          y: e.pageY,
          fill: this.color.current,
          r: anime.random(10, 20),
        });
        this.particles.push(particle);
      }
      this.animPartl = anime({
        targets: this.particles,
        x(particle) {
          return particle.x + anime.random(rippleSize, -rippleSize);
        },
        y(particle) {
          return particle.y + anime.random(rippleSize, -rippleSize);
        },
        r: {
          value: 0,
          delay: 400,
          duration: 400,
          easing: 'easeOutCubic',
        },
        easing: 'easeInOutQuart',
        duration: anime.random(600, 800),
        complete: this.removeAnimation(this.animPartl),
      });
      this.animations.push(this.animPartl);
    }.bind(this);

    // Create brick animation
    const funcBricksplosion = function () {
      this.bricks = document.querySelectorAll('.brick');
      this.animBrick = anime({
        targets: this.bricks,
        translateX() {
          return anime.random(targetR, -targetR) * 3;
        },
        translateY() {
          return anime.random(targetR * 1.15, -targetR * 1.15) * 3;
        },
        rotate() {
          return anime.random(200, 500);
        },
        duration: 2000,
        delay: 150,
        easing: 'easeOutCubic',
        complete: this.removeAnimation(this.animBrick),
      });
      this.animations.push(this.animBrick);
    }.bind(this);

    // Change the class, and enque the animations
    Logger.log('On the launchpad');
    if (newPage.is('#bigBaby')) {
      funcRipple();
      funcParticles();
    } else if ($(element).is('#cloudLink')) {
      this.closePost();
    } else {
      Logger.log(newPage.attr('id'));
      funcBgFiller();
      funcRipple();
      funcBricksplosion();
      this.openPost(newPage);
    }
  } // handleEvent()

  animate() {
    anime({
      duration: Infinity,
      update: () => {
        this.cxt.fillStyle = 'transparent';
        this.cxt.fillRect(0, 0, this.cW, this.cH);
        this.animations.forEach((anim) => {
          anim.animatables.forEach((animatable) => {
            if (typeof animatable.target.draw !== 'undefined') {
              animatable.target.draw(this.cxt);
            }
          });
        });
      },
    });
  }

  removeAnimation(animation) {
    const index = () => this.animations.indexOf(animation);
    if (index > -1) this.animations.splice(index, 1);
  }

  openPost($brick) {
    if (this.cloneCheck) {
      this.cloneCheck = false;
      this.$clone = $brick.clone(false);
      this.$clone.removeAttr('style').addClass('invisible').attr('id', 'bigBaby');
      this.funcCloudHideChange(this.$clone.find('.magicLink').first().html());
      this.$clone.find('header').first().detach();
      $('main').css({
        'z-index': 50,
        height: 0,
        overflow: 'hidden',
      });
      this.addClickListeners(this.$clone);
      this.addClickListeners(this.$cloudLink);
      this.$clone.appendTo('#heightDefined');
    }
  }

  closePost() {
    // this.funcCloudHideChange();
    // There's no way to access the drawn circle
    // after it's been thrown up,
    // Hence playback controls won't work.
    // Test on the original in codepen
    this.removeAnimation(this.animBg);
    this.animBg.restart();
    this.animBg.pause();
    this.animations.push(this.animBg);
    // this.animBg.pause();
  }

  /* eslint object-shorthand: "warn" */
  funcCloudHideChange(newLink = this.originalCloudText) {
    this.animHideChange = anime({
      targets: this.$cloudLink[0],
      opacity: 0,
      easing: 'easeOutQuint',
      duration: 1000,
      begin: function () {
        this.funcCloudScale();
        this.$clone.toggleClass('invisible');
      }.bind(this),
      complete: function () {
        this.$cloudLink.html(newLink);
        this.funcCloudVisible();
        this.removeAnimation(this.animHideChange);
      }.bind(this),
    });
    this.animations.push(this.animHideChange);
  }

  funcCloudVisible() {
    this.animCloudVis = anime({
      targets: this.$cloudLink[0],
      opacity: 1,
      easing: 'easeInQuad',
      duration: 1000,
      delay: 100,
      complete: this.removeAnimation(this.animCloudVis),
    });
    this.animations.push(this.animCloudVis);
  }

  funcCloudScale() {
    this.animScale = anime({
      targets: this.$cloud[0],
      scale: 0.85,
      'min-width': '120%',
      duration: 1000,
      delay: 400,
      easing: 'easeInOutQuad',
      complete: this.removeAnimation(this.animCloudScale),
    });
    this.animations.push(this.animScale);
  }

  extend(a, b) {
    return Object.assign(a, b);
  }
}
