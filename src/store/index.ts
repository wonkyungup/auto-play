import { configureStore } from '@reduxjs/toolkit';
import toggleSwitchReducer from './ToggleSwitch';
import optionsReducer from './Options';
import ytsReducer from './YoutubeShorts';

const store = configureStore({
  reducer: {
    toggleSwitch: toggleSwitchReducer,
    options: optionsReducer,
    yts: ytsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
