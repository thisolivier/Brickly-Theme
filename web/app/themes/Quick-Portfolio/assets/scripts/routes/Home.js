// jshint max-len:0
import 'jquery';
import ChimneyStack from '../com/chimney';
import BrickAnimation from '../com/animBrickFall';
import BackgroundLanscape from '../com/parallaxBg';
import OpenPost from '../com/openPost';
import FillCanvas from '../com/animExpandBg';

export default {
  init() {
    const chim = new ChimneyStack();
    chim.conductor();
  },

  finalize() {
    BrickAnimation.animate();
    OpenPost.binder();

    const fillCanvas = new FillCanvas();
    fillCanvas.init();

    const horizon = new BackgroundLanscape('.backgroundLanscape');
    /* eslint-disable*/
    $(window).scroll(function() { horizon.adjust(window); });
    /* eslint-enable*/
  },
};
