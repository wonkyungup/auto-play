import Defs, { TypeOptions } from '../assets/constatns';

const initialState: TypeOptions = {
  rotate: 0,
  isCC: true,
};

const optionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_OPTIONS_ROTATE:
      state.rotate = action.rotate;
      break;
    case Defs.REDUX_OPTIONS_CC:
      state.isCC = action.cc;
      break;
    default:
      break;
  }

  return state;
};

export { optionsReducer };
