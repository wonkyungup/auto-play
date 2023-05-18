import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypeOptions {
  rotate: number;
  ccState: boolean;
  playBackRate: number;
  overlayState: boolean;
  volume: number;
}

const initialState: TypeOptions = {
  rotate: 0,
  ccState: true,
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
    setOptionCC: (state) => {
      state.ccState = !state.ccState;
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
  setOptionCC,
  setOptionPlaybackRate,
  setOptionOverlay,
  setOptionVolume,
} = optionSlice.actions;

export default optionSlice.reducer;
