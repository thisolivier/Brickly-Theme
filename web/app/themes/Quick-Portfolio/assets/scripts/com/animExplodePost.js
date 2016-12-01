import anime from 'animejs';
import Logger from '../util/logger';

export default class FillCanvas {
  /* eslint no-param-reassign: "warn", class-methods-use-this: "warn" */
  constructor() {
    this.c = document.getElementById('backgroundPost');
    this.cxt = this.c.getContext('2d');
    this.toBind = $('.magicLink');
    this.cH = 0;
    this.cW = 0;
    this.animations = [];
    this.circles = [];
    this.colors = ['black', 'rgba(0, 0, 0, 0)'];
    this.colorPicker.index = 0;
    this.classBig = 'current_post';
    this.cloneCheck = true;
  }

  init() {
    Logger.log('begin', 'the expand function');
    this.resizeCanvas(); // Fix me?
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
      $(toBind).each((i, x) => bind(i, x));
    } else {
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
    const color = this.colorPicker();
    const currentColor = 'white';
    const nextColor = color.next;
    const targetR = Math.sqrt(
      Math.pow(
        Math.max(e.pageX - 0, this.cW - e.pageX), 2
      ) + Math.pow(
        Math.max(e.pageY - 0, this.cH - e.pageY), 2
      )
    );
    const rippleSize = Math.min(200, (this.cW * 0.4));
    const minCoverDuration = 750;
    const e2 = e || window.event;
    const element = e2.target || e2.srcElement;
    const newPage = $(element).closest('article');
    const removeAnimation = (animation) => {
      const index = this.animations.indexOf(animation); // indexOf works on what?
      Logger.log(`Supplimental. Removing animation ${animation} with index of ${index}`);
      if (index > -1) this.animations.splice(index, 1);
    };

    // Create page filling obj and animation
    const pageFill = new this.Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: nextColor,
    });
    const fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration: Math.max(targetR / 2, minCoverDuration),
      easing: 'easeOutQuart',
    });

    // Create ripple obj and animation
    const ripple = new this.Circle({
      x: e.pageX,
      y: e.pageY,
      r: 0,
      fill: currentColor,
      stroke: {
        width: 3,
        color: currentColor,
      },
      opacity: 1,
    });
    const rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: {
        value: 0,
        delay: 400,
        duration: 600,
      },
      easing: 'easeOutExpo',
      duration: 900,
      complete: removeAnimation,
    });

    // Create particle objects and animation
    const particles = [];
    for (let i = 0; i < 20; i += 1) {
      const particle = new this.Circle({
        x: e.pageX,
        y: e.pageY,
        fill: currentColor,
        r: anime.random(30, 60),
      });
      particles.push(particle);
    }
    const particlesAnimation = anime({
      targets: particles,
      x(particle) {
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y(particle) {
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: 'easeOutExpo',
      duration: anime.random(1000, 1300),
      complete: removeAnimation,
    });

    // Create brick animation and add method for returning bricks
    const bricks = document.querySelectorAll('.brick:not(.current_post)');
    for (const brick of bricks) {
      brick.draw = this.clonePost(newPage);
    }

    const brickAnimation = anime({
      targets: bricks,
      rotate: 500,
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
      duration() {
        return anime.random(500, 900); // Will set a random value from 50 to 100 to each divs
      },
      easing: 'linear',
      complete: removeAnimation,
    });
    Logger.log('On the launchpad');
    // Change the class, and enque the animations
    if (!newPage.hasClass(this.classBig)) {
      newPage.addClass(this.classBig);
      this.clonePost(newPage);
      this.animations.push(brickAnimation, fillAnimation, rippleAnimation, particlesAnimation);
    } else {
      Logger.log('We.re getting outta here');
      newPage.removeClass(this.classBig);
      removeAnimation(fillAnimation);
      removeAnimation(brickAnimation);
      this.animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    }
  } // handleEvent

  colorPicker() {
    const colors = this.colors;
    const nextIndex = this.index < (colors.length - 1) ? this.index + 1 : 0;
    const currentCol = colors[this.index];
    const nextCol = colors[nextIndex];
    Logger.log(`Current color is ${this.index}, the next will be ${nextIndex}`);
    this.index = nextIndex;
    return {
      next: nextCol,
      current: currentCol,
    };
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
    this.c.width = this.cW * window.devicePixelRatio;
    this.c.height = this.cH * window.devicePixelRatio;
    this.cxt.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  clonePost($brick) {
    if (this.cloneCheck) {
      this.cloneCheck = false;
      const currentPos = $brick[0].getBoundingClientRect();
      const currentDim = {
        x: currentPos.right - currentPos.left,
        y: currentPos.bottom - currentPos.top,
      };
      const $clone = $brick.clone(true, true);
      $clone.attr('id', 'bigBaby');
      this.addClickListeners($clone);
      $clone.css({
        width: currentDim.x,
        top: currentPos.top,
        left: currentPos.left,
        transition: 'all 2s',
      });
      $clone.appendTo('#heightDefined');
      $('main').css('z-index', 50);
    }
  }
}
