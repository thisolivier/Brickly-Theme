import anime from 'animejs';

export default class FillCanvas {
  constructor() {
    this.c = document.getElementById('backgroundPost');
    this.ctx = this.c.getContext('2d');
    this.cH = 0;
    this.cW = 0;
    this.bgColor = 'transparent';
    this.animations = [];
    this.circles = [];
    this.colorPicker = () => {
      const colors = ['white', 'black'];
      let index = 0;
      const nextCol = () => {
        index = (index + 1) < colors.length - 1 ? index + 1 : 0;
        return colors[index];
      };
      const currentCol = colors[index];
      return {
        next: nextCol,
        current: currentCol,
      };
    };
    this.Circle = function (opts) {
      this.extend(this, opts);
    };
    this.Circle.prototype.draw = function () {
      this.cxt.globalAlpha = this.opacity || 1;
      this.cxt.beginPath();
      this.cxt.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
      if (this.stroke) {
        this.cxt.strokeStyle = this.stroke.color;
        this.cxt.lineWidth = this.stroke.width;
        this.cxt.stroke();
      }
      if (this.fill) {
        this.cxt.fillStyle = this.fill;
        this.cxt.fill();
      }
      this.cxt.closePath();
      this.cxt.globalAlpha = 1;
    };
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
    this.addClickListeners();
    this.handleInactiveUser();
  }

  removeAnimation(animation) {
    const index = this.animations.indexOf(animation);
    if (index > -1) this.animations.splice(index, 1);
  }

  calcPageFillRadius(x, y) {
    const l = Math.max(x - 0, this.cW - x);
    const h = Math.max(y - 0, this.cH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
  }

  addClickListeners() {
    document.addEventListener('touchstart', this.handleEvent);
    document.addEventListener('mousedown', this.handleEvent);
  };

  handleEvent(e) {
    if (e.touches) {
      e.preventDefault();
      e = e.touches[0];
    }
    const currentColor = this.colorPicker.current();
    const nextColor = this.colorPicker.next();
    const targetR = this.calcPageFillRadius(e.pageX, e.pageY);
    const rippleSize = Math.min(200, (this.cW * 0.4));
    const minCoverDuration = 750;

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
      complete: function () {
        this.bgColor = pageFill.fill;
        this.removeAnimation(fillAnimation);
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
      complete: this.removeAnimation,
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
      x: function (particle) {
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function (particle) {
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: 'easeOutExpo',
      duration: anime.random(1000, 1300),
      complete: this.removeAnimation,
    });
    this.animations.push(fillAnimation, rippleAnimation, particlesAnimation);
  }

  extend(a, b) {
    for (const key in b) {
      if ({}.hasOwnProperty.call(b, key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  animate() {
    anime({
      duration: Infinity,
      update() {
        this.cxt.fillStyle = this.bgColor;
        this.cxt.fillRect(0, 0, this.cW, this.cH);
        this.animations.forEach(function (anim) {
          anim.animatables.forEach(function (animatable) {
            animatable.target.draw();
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

  handleInactiveUser() {
    const inactive = setTimeout(function () {
      this.fauxClick(this.cW / 2, this.cH / 2);
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

  fauxClick(x, y) {
    const fauxClick = new Event('mousedown');
    fauxClick.pageX = x;
    fauxClick.pageY = y;
    document.dispatchEvent(fauxClick);
  }
}
