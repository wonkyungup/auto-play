import Defs, { TypeOptions } from '../assets/constatns';

const initialState: TypeOptions = {
  rotate: 0,
  isCC: true,
  nPlayBackRate: 1.0,
};

const optionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_OPTIONS_ROTATE:
      state.rotate = action.rotate;
      break;
    case Defs.REDUX_OPTIONS_CC:
      state.isCC = action.cc;
      break;
    case Defs.REDUX_OPTION_PLAY_BACK_RATE:
      state.nPlayBackRate = action.nPlayBackRate;
      break;
    default:
      break;
  }

  return state;
};

export { optionsReducer };
