import anime from 'animejs';
import Logger from '../util/logger';

export default class FillCanvas {
  /* eslint no-param-reassign: "warn", class-methods-use-this: "warn" */
  constructor() {
    this.c = document.getElementById('backgroundPost');
    this.cxt = this.c.getContext('2d');
    this.cH = 0;
    this.cW = 0;

    this.toBind = $('.magicLink');
    this.color = { current: 'white', next: 'black' };
    this.classBig = 'current_post';
    this.cloneCheck = true;

    this.animations = [];
    this.circles = [];
  }

  init() {
    Logger.log('begin', 'the expand function');
    this.resizeCanvas(); // Fix me, scoping errors
    this.addMethods(); // Adds methods on bricks and circles to be called when animating
    window.addEventListener('resize', this.resizeCanvas);
    this.addClickListeners(this.toBind); // Adds triggers - animations will add to queue.
    this.animate(); // Begins animation engine - implaments queue.
  }

  addClickListeners(toBind) {
    const handleEvent = this.handleEvent;
    const bind = (i, x) => {
      x.addEventListener('touchstart',
        (e) => { handleEvent.call(this, e); }
      );
      x.addEventListener('mousedown',
        (e) => { handleEvent.call(this, e); }
      );
    };
    if (toBind instanceof jQuery) {
      // If we have a jquery object, bind each of the elements within it
      // pass the 'addListeners' function the index and the object itself
      $(toBind).each((i, x) => bind(i, x));
    } else {
      // Pass the 'addListeners' function an index of 0 and the object itself
      bind(0, toBind);
    }
  }

  handleEvent(e) {
    // Correct the event
    if (e.touches) {
      e.preventDefault();
      e = e.touches[0];
    }
    // Load variables
    const e2 = e || window.event;
    const element = e2.target || e2.srcElement;
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
        complete: this.removeAnimation,
      });
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
        complete: this.removeAnimation(this.animBrick),
      });
    }.bind(this);

    // Create brick animation
    const funcBricksplosion = function () {
      this.bricks = document.querySelectorAll('.brick:not(.current_post)');
      this.animBrick = anime({
        targets: this.bricks,
        translateX() {
          return anime.random(targetR, -targetR) * 2;
        },
        translateY() {
          return anime.random(targetR * 1.15, -targetR * 1.15) * 2;
        },
        rotate() {
          return anime.random(200, 500);
        },
        duration: 600,
        easing: 'easeInOutQuint',
        delay: 200,
        complete: this.removeAnimation(this.animBrick),
      });
    }.bind(this);

    // Change the class, and enque the animations

    if ($(element).is('#backgroundPost')) {
      Logger.log(`Our new page will be ${newPage.attr('id')}`);
      Logger.log('background post');
      funcRipple();
      funcParticles();
      this.animations.push(this.animRipple, this.animPartl);
    } else if ($(element).is('#closeDown')) {
      this.removeAnimation(this.animBg);
      this.removeAnimation(this.animBrick);
    } else {
      Logger.log(`Our new page is ${newPage.attr('class')}`);
      funcBgFiller();
      funcRipple();
      funcBricksplosion();
      this.clonePost(newPage);
      this.animations.push(
        this.animBrick,
        this.animBg,
        this.animRipple,
      );
    }
  } // handleEvent

  removeAnimation(animation) {
    Logger.log(`Animation is ${animation}`);
    const index = () => this.animations.indexOf(animation);
    if (index > -1) this.animations.splice(index, 1);
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

  extend(a, b) {
    return Object.assign(a, b);
  }

  animate() {
    const cW = this.cW;
    const cH = this.cH;
    const cxt = this.cxt;
    const animations = this.animations;

    anime({
      duration: Infinity,
      update() {
        cxt.fillStyle = 'transparent';
        cxt.fillRect(0, 0, cW, cH);
        animations.forEach((anim) => {
          anim.animatables.forEach((animatable) => {
            if (typeof animatable.target.draw !== 'undefined') {
              animatable.target.draw(cxt);
            }
          });
        });
      },
    });
  }

  resizeCanvas() {
    this.cW = window.innerWidth;
    this.cH = window.innerHeight;
    const cxt = this.cxt;
    $(this.c).width = this.cW * window.devicePixelRatio;
    $(this.c).height = this.cH * window.devicePixelRatio;
    cxt.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  clonePost($brick) {
    const funcSortSizing = function (clone) {
      const a = $(clone).find('.magicLink');
      const aWidth = a.width();
      const cloWidth = $(clone).width();
      Logger.log(`Far and few, far and few are the lands a with ${aWidth}, and a clone width ${cloWidth}`);
      this.animTypography = anime({
        targets: a[0],
        translateX: '50vw',
        marginLeft: -aWidth / 2,
        duration: 2000,
        delay: 1000,
        easing: 'easeInCubic',
      });
    }.bind(this);
    const funcPostAnimations = function (clone) {
      this.animBigPost = anime({
        targets: clone,
        top: 0,
        left: 0,
        right: 0,
        width: '50%',
        duration: 600,
        delay: 500,
        easing: 'easeInOutSine',

      });
    }.bind(this);

    if (this.cloneCheck) {
      this.cloneCheck = false;
      const currentPos = $brick[0].getBoundingClientRect();
      const currentDim = {
        x: currentPos.right - currentPos.left,
        y: currentPos.bottom - currentPos.top,
      };
      const $clone = $brick.clone(true, true);
      let percent = (currentDim.x / window.innerWidth) * 100;
      percent = `${percent}%`;
      $clone.attr('id', 'bigBaby');
      this.addClickListeners($clone.find('.magicLink'));
      this.addClickListeners(document.getElementById('backgroundPost'));
      Logger.log(`Our percent is ${percent}`);
      $clone.css({
        width: percent,
        backgroundColor: 'transparent',
        top: currentPos.top,
        left: currentPos.left,
        transition: 'all 2s',
        zIndex: 90,
      });
      $clone.appendTo('#heightDefined');
      $('main').css('z-index', 50);
      funcPostAnimations($clone[0]);
      funcSortSizing($clone[0]);
      this.animations.push(
        this.animBigPost,
        this.animTypography,
      );
    }
  }
}
