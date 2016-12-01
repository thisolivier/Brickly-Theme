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
  },

  finalize() {
    BrickAnimation.animate();
    const animator = new FillCanvas();
    animator.init();

    const horizon = new BackgroundLanscape('.backgroundLanscape');
    /* eslint-disable*/
    $(window).scroll(function() { horizon.adjust(window); });
    /* eslint-enable*/
  },
};
