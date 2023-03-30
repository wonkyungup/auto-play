import Defs, { TypeToggleSwitch } from '../assets/constatns';

const initialState: TypeToggleSwitch = {
  status: false,
};

const toggleSwitchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Defs.REDUX_TOGGLE_SWITCH_CHANGE:
      state.status = action.value;
      break;
    default:
      break;
  }

  return state;
};

export { toggleSwitchReducer };
