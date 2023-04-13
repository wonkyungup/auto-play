import Defs, { TypeOptions } from '../assets/constatns';

const initialState: TypeOptions = {
  base: {
    rotate: 0,
    open: false,
  },
  closedCaption: {
    state: true,
    open: false,
  },
  playBackRate: {
    speed: 1.0,
    open: false,
  },
};

const optionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_OPTION_OPEN:
      state.base.open = !state.base.open;
      break;
    case Defs.REDUX_OPTIONS_ROTATE:
      state.base.rotate = action.rotate;
      break;
    case Defs.REDUX_OPTIONS_CC:
      state.closedCaption.state = action.cc;
      break;
    case Defs.REDUX_OPTION_PLAY_BACK_RATE:
      state.playBackRate.speed = action.speed;
      break;
    default:
      break;
  }

  return state;
};

export { optionsReducer };
