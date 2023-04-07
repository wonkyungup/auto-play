import { createStore, combineReducers } from 'redux';
import { toggleSwitchReducer } from './ToggleSwitch';
import { optionsReducer } from './Options';
import { ytsReducer } from './YoutubeShorts';

const rootReducer = combineReducers({
  toggleSwitch: toggleSwitchReducer,
  options: optionsReducer,
  yts: ytsReducer,
});

const store = createStore(rootReducer);

export { store };
