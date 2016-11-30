// import anime from 'animejs';

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
  }
 /*
  function removeAnimation(animation) {
    var index = animations.indexOf(animation);
    if (index > -1) animations.splice(index, 1);
  }

  function calcPageFillRadius(x, y) {
    var l = Math.max(x - 0, cW - x);
    var h = Math.max(y - 0, cH - y);
    return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
  }

  function addClickListeners() {
    document.addEventListener("touchstart", handleEvent);
    document.addEventListener("mousedown", handleEvent);
  };

  function handleEvent(e) {
      if (e.touches) {
        e.preventDefault();
        e = e.touches[0];
      }
      var currentColor = colorPicker.current();
      var nextColor = colorPicker.next();
      var targetR = calcPageFillRadius(e.pageX, e.pageY);
      var rippleSize = Math.min(200, (cW * .4));
      var minCoverDuration = 750;

      var pageFill = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: nextColor
      });
      var fillAnimation = anime({
        targets: pageFill,
        r: targetR,
        duration:  Math.max(targetR / 2 , minCoverDuration ),
        easing: "easeOutQuart",
        complete: function(){
          bgColor = pageFill.fill;
          removeAnimation(fillAnimation);
        }
      });

      var ripple = new Circle({
        x: e.pageX,
        y: e.pageY,
        r: 0,
        fill: currentColor,
        stroke: {
          width: 3,
          color: currentColor
        },
        opacity: 1
      });
      var rippleAnimation = anime({
        targets: ripple,
        r: rippleSize,
        opacity: 0,
        easing: "easeOutExpo",
        duration: 900,
        complete: removeAnimation
      });

      var particles = [];
      for (var i=0; i<32; i++) {
        var particle = new Circle({
          x: e.pageX,
          y: e.pageY,
          fill: currentColor,
          r: anime.random(24, 48)
        })
        particles.push(particle);
      }
      var particlesAnimation = anime({
        targets: particles,
        x: function(particle){
          return particle.x + anime.random(rippleSize, -rippleSize);
        },
        y: function(particle){
          return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
        },
        r: 0,
        easing: "easeOutExpo",
        duration: anime.random(1000,1300),
        complete: removeAnimation
      });
      animations.push(fillAnimation, rippleAnimation, particlesAnimation);
  }

  function extend(a, b){
    for(var key in b) {
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  var Circle = function(opts) {
    extend(this, opts);
  }

  Circle.prototype.draw = function() {
    ctx.globalAlpha = this.opacity || 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    if (this.stroke) {
      ctx.strokeStyle = this.stroke.color;
      ctx.lineWidth = this.stroke.width;
      ctx.stroke();
    }
    if (this.fill) {
      ctx.fillStyle = this.fill;
      ctx.fill();
    }
    ctx.closePath();
    ctx.globalAlpha = 1;
  }

  var animate = anime({
    duration: Infinity,
    update: function() {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, cW, cH);
      animations.forEach(function(anim) {
        anim.animatables.forEach(function(animatable) {
          animatable.target.draw();
        });
      });
    }
  });

  var resizeCanvas = function() {
    cW = window.innerWidth;
    cH = window.innerHeight;
    c.width = cW * devicePixelRatio;
    c.height = cH * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  (function init() {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    addClickListeners();
    handleInactiveUser();
  })();

  function handleInactiveUser() {
    var inactive = setTimeout(function(){
      fauxClick(cW/2, cH/2);
    }, 2000);

    function clearInactiveTimeout() {
      clearTimeout(inactive);
      document.removeEventListener("mousedown", clearInactiveTimeout);
      document.removeEventListener("touchstart", clearInactiveTimeout);
    }

    document.addEventListener("mousedown", clearInactiveTimeout);
    document.addEventListener("touchstart", clearInactiveTimeout);
  }

  function startFauxClicking() {
    setTimeout(function(){
      fauxClick(anime.random( cW * .2, cW * .8), anime.random(cH * .2, cH * .8));
      startFauxClicking();
    }, anime.random(200, 900));
  }

  function fauxClick(x, y) {
    var fauxClick = new Event("mousedown");
    fauxClick.pageX = x;
    fauxClick.pageY = y;
    document.dispatchEvent(fauxClick);
  }
  */
}
