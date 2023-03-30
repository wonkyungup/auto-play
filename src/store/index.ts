import { createStore, combineReducers } from 'redux';
import { toggleSwitchReducer } from './ToggleSwitch';
import { optionsReducer } from './Options';

const rootReducer = combineReducers({
  toggleSwitch: toggleSwitchReducer,
  options: optionsReducer,
});

const store = createStore(rootReducer);

export { store };
