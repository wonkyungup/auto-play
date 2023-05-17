import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypeOptions {
  base: {
    rotate: number;
  };
  closedCaption: {
    state: boolean;
  };
  playBackRate: {
    speed: number;
  };
  clearWindowText: {
    state: boolean;
  };
  videoVol: {
    value: number;
  };
}

const initialState: TypeOptions = {
  base: {
    rotate: 0,
  },
  closedCaption: {
    state: true,
  },
  playBackRate: {
    speed: 1.0,
  },
  clearWindowText: {
    state: false,
  },
  videoVol: {
    value: 1,
  },
};

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setRotate: (state, action: PayloadAction<number>) => {
      state.base.rotate = action.payload;
    },
    setClosedCaption: (state, action: PayloadAction<boolean>) => {
      state.closedCaption.state = action.payload;
    },
    setPlaybackRate: (state, action: PayloadAction<number>) => {
      state.playBackRate.speed = action.payload;
    },
    setClearWindowText: (state, action: PayloadAction<boolean>) => {
      state.clearWindowText.state = action.payload;
    },
    setVideoVolume: (state, action: PayloadAction<number>) => {
      state.videoVol.value = action.payload;
    },
  },
});

export const {
  setRotate,
  setClosedCaption,
  setPlaybackRate,
  setVideoVolume,
  setClearWindowText,
} = optionSlice.actions;

export default optionSlice.reducer;
