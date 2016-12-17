// jshint max-len:0
import 'jquery';
import ChimneyStack from '../com/chimney';
import BrickAnimation from '../com/animBrickFall';
import BackgroundLanscape from '../com/parallaxBg';
import FillCanvas from '../com/animOpenPosts';

export default {
  init() {
    const chim = new ChimneyStack();
    chim.conductor();
    $('.widget h3').click(function () {
      $(this).next('.widget-content').slideToggle({
        duration: 1000,
      });
    });
  },

  finalize() {
    const animator = new FillCanvas();
    const horizon = new BackgroundLanscape();
    const makeWall = new BrickAnimation();
    makeWall.init();
    horizon.init();
    animator.init();
  },
};
