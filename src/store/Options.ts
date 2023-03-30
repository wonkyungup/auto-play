import Defs, { TypeOptions } from '../assets/constatns';

const initialState: TypeOptions = {
  rotate: 0,
};

const optionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_OPTIONS_ROTATE:
      state.rotate = action.rotate;
      break;
    default:
      break;
  }

  return state;
};

export { optionsReducer };
