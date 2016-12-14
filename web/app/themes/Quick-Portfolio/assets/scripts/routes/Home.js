// jshint max-len:0
import 'jquery';
import ChimneyStack from '../com/chimney';
import BrickAnimation from '../com/animBrickFall';
import BackgroundLanscape from '../com/parallaxBg';
import FillCanvas from '../com/animExplodePost';

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
    BrickAnimation.animate();
    horizon.init();
    animator.init();
  },
};
