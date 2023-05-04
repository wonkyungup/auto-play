import { createStore, combineReducers } from 'redux';
import { toggleSwitchReducer } from './ToggleSwitch';
import { optionsReducer } from './Options';
import { ytsReducer } from './YoutubeShorts';
import { downloaderReducer } from './Downloader';

const rootReducer = combineReducers({
  toggleSwitch: toggleSwitchReducer,
  options: optionsReducer,
  yts: ytsReducer,
  downloader: downloaderReducer,
});

const store = createStore(rootReducer);

export { store };
