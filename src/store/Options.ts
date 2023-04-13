import Defs, { TypeOptions } from '../assets/constatns';

const initialState: TypeOptions = {
  base: {
    rotate: 0,
  },
  closedCaption: {
    state: true,
  },
  playBackRate: {
    speed: 1.0,
  },
  controls: {
    state: false,
  },
};

const optionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_OPTIONS_ROTATE:
      state.base.rotate = action.rotate;
      break;
    case Defs.REDUX_OPTIONS_CC:
      state.closedCaption.state = action.cc;
      break;
    case Defs.REDUX_OPTIONS_PLAY_BACK_RATE:
      state.playBackRate.speed = action.speed;
      break;
    case Defs.REDUX_OPTIONS_CONTROLS:
      state.controls.state = action.isControls;
      break;
    default:
      break;
  }

  return state;
};

export { optionsReducer };
