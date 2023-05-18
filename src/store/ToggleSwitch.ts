import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TypeToggleSwitch {
  status: boolean;
}

const initialState: TypeToggleSwitch = {
  status: false,
};

const toggleSwitchSlice = createSlice({
  name: 'toggleSwitch',
  initialState,
  reducers: {
    setAutoPlay: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { setAutoPlay } = toggleSwitchSlice.actions;
export default toggleSwitchSlice.reducer;
