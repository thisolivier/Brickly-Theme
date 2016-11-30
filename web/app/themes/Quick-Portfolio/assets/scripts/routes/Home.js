// jshint max-len:0
import 'jquery';
import Logger from '../util/logger';
import ChimneyStack from '../com/chimney';
import BrickAnimation from '../com/animBrickFall';
import BackgroundLanscape from '../com/parallaxBg';
// import FillCanvas from '../com/animExpandBg';
import OpenPost from '../com/openPost';

export default {
  init() {
    const chim = new ChimneyStack();
    chim.conductor();

    Logger.log('begin', 'the exploding fortress');
    OpenPost.binder();
    Logger.log();
  },

  finalize() {
    const horizon = new BackgroundLanscape('.backgroundLanscape');
    /* eslint-disable*/
    $(window).scroll(function() { horizon.adjust(window); });
    /* eslint-enable*/
    BrickAnimation.animate();
  },
};
