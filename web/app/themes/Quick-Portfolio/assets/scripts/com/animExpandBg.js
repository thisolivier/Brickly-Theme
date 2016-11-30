import anime from 'animejs';
import Logger from '../util/logger';

export default class FillCanvas {
  /* eslint no-param-reassign: "warn", class-methods-use-this: "warn" */
  constructor() {
    this.c = document.getElementById('backgroundPost');
    this.cxt = this.c.getContext('2d');
    this.cH = 0;
    this.cW = 0;
    this.bgColor = 'transparent';
    this.animations = [];
    this.circles = [];
    this.colorPicker = function () {
      const colors = ['white', 'black'];
      const nextIndex = this.index < (colors.length - 1) ? this.index + 1 : 0;
      const currentCol = colors[this.index];
      const nextCol = colors[nextIndex];
      Logger.log(`Current color is ${this.index}, the next will be ${nextIndex}`);
      this.index = nextIndex;
      return {
        next: nextCol,
        current: currentCol,
      };
    };
    this.colorPicker.index = 0;
  }

  init() {
    Logger.log('begin', 'the expand function');
    this.resizeCanvas();
    this.addCircleMethod();
    window.addEventListener('resize', this.resizeCanvas);
    this.addClickListeners();
    this.handleInactiveUser();
    this.animate();
  }

  Circle(opts) {
    Object.assign(this, opts);
  }
  addCircleMethod() {
    this.Circle.prototype.draw = function (cxt) {
      cxt.globalAlpha = this.opacity || 1;
      cxt.beginPath();
      cxt.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      if (this.stroke) {
        cxt.strokeStyle = this.stroke.color;
        cxt.lineWidth = this.stroke.width;
        cxt.stroke();
      }
      if (this.fill) {
        cxt.fillStyle = this.fill;
        cxt.fill();
      }
      cxt.closePath();
      cxt.globalAlpha = 1;
    };
  }

  calcPageFillRadius(x, y) {
    const l = Math.max(x - 0, this.cW - x);
    const h = Math.max(y - 0, this.cH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
  }

  addClickListeners() {
    this.c.addEventListener('touchstart',
      (e) => { this.handleEvent(e); }
    );
    this.c.addEventListener('mousedown',
      (e) => { this.handleEvent(e); }
    );
  }

  handleEvent(e) {
    if (e.touches) {
      e.preventDefault();
      e = e.touches[0];
    }
    const color = this.colorPicker();
    const currentColor = color.current;
    const nextColor = color.next;
    const targetR = this.calcPageFillRadius(e.pageX, e.pageY);
    const rippleSize = Math.min(200, (this.cW * 0.4));
    const minCoverDuration = 750;
    const removeAnimation = (animation) => {
      const index = this.animations.indexOf(animation);
      if (index > -1) this.animations.splice(index, 1);
    };
    const setBgColor = (col) => {
      this.bgColor = col;
    };
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
      complete() {
        setBgColor(pageFill.fill);
        removeAnimation(fillAnimation);
      },
    });

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
      opacity: 0,
      easing: 'easeOutExpo',
      duration: 900,
      complete: removeAnimation,
    });

    const particles = [];
    for (let i = 0; i < 32; i += 1) {
      const particle = new this.Circle({
        x: e.pageX,
        y: e.pageY,
        fill: currentColor,
        r: anime.random(24, 48),
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
    this.animations.push(fillAnimation, rippleAnimation, particlesAnimation);
  }

  extend(a, b) {
    return Object.assign(a, b);
  }

  animate() {
    const bgColor = () => this.bgColor;
    const cW = this.cW;
    const cH = this.cH;
    const cxt = this.cxt;
    const animations = this.animations;

    anime({
      duration: Infinity,
      update() {
        cxt.fillStyle = bgColor;
        cxt.fillRect(0, 0, cW, cH);
        animations.forEach((anim) => {
          anim.animatables.forEach((animatable) => {
            animatable.target.draw(cxt);
          });
        });
      },
    });
  }

  resizeCanvas() {
    this.cW = window.innerWidth;
    this.cH = window.innerHeight;
    this.c.width = this.cW * devicePixelRatio;
    this.c.height = this.cH * devicePixelRatio;
    this.cxt.scale(devicePixelRatio, devicePixelRatio);
  }

  fauxClick(x, y) {
    const fauxClick = new Event('mousedown');
    fauxClick.pageX = x;
    fauxClick.pageY = y;
    document.dispatchEvent(fauxClick);
  }

  handleInactiveUser() {
    const fauxClick = this.fauxClick;
    const inactive = setTimeout(function () {
      fauxClick(this.cW / 2, this.cH / 2);
    }, 2000);

    const clearInactiveTimeout = function () {
      clearTimeout(inactive);
      document.removeEventListener('mousedown', clearInactiveTimeout);
      document.removeEventListener('touchstart', clearInactiveTimeout);
    };

    document.addEventListener('mousedown', clearInactiveTimeout);
    document.addEventListener('touchstart', clearInactiveTimeout);
  }

  startFauxClicking() {
    setTimeout(function () {
      this.fauxClick(anime.random(this.cW * 0.2, this.cW * 0.8),
       anime.random(this.cH * 0.2, this.cH * 0.8));
      this.startFauxClicking();
    }, anime.random(200, 900));
  }
}
