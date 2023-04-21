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
  clearWindowText: {
    state: false,
  },
  videoVol: {
    value: 1,
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
    case Defs.REDUX_OPTION_PLAY_BACK_RATE:
      state.playBackRate.speed = action.speed;
      break;
    case Defs.REDUX_OPTION_WINDOW_OVERLAY:
      state.clearWindowText.state = action.clearWindowText;
      break;
    case Defs.REDUX_OPTION_CONTROL_VIDEO_VOL:
      state.videoVol.value = action.vol;
      break;
    default:
      break;
  }

  return state;
};

export { optionsReducer };
