// jshint max-len:0
import 'jquery';
import ChimneyStack from '../com/brickLayout';
import BrickAnimation from '../com/animBrickFall';
import BackgroundLanscape from '../com/parallaxBg';
import PageTransitions from '../com/animOpenPostController';

export default {
  init() {
    const chim = new ChimneyStack();
    chim.conductor();
  },

  finalize() {
    const pageChange = new PageTransitions();
    const horizonShift = new BackgroundLanscape();
    const makeWall = new BrickAnimation();
    makeWall.init();
    horizonShift.init();
    pageChange.init();
  },
};
