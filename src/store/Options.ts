import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypeOptions {
  rotate: number;
  playBackRate: number;
  overlayState: boolean;
  volume: number;
}

const initialState: TypeOptions = {
  rotate: 0,
  playBackRate: 1.0,
  overlayState: false,
  volume: 1,
};

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setOptionRotate: (state, action: PayloadAction<number>) => {
      state.rotate = action.payload;
    },
    setOptionPlaybackRate: (state, action: PayloadAction<number>) => {
      state.playBackRate = action.payload;
    },
    setOptionOverlay: (state) => {
      state.overlayState = !state.overlayState;
    },
    setOptionVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const {
  setOptionRotate,
  setOptionPlaybackRate,
  setOptionOverlay,
  setOptionVolume,
} = optionSlice.actions;

export default optionSlice.reducer;
