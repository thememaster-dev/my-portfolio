import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: false,
  reducers: {
    toggleSidebar: (state) => {
      return !state;
    },
  },
});

export const { toggleSidebar } = layoutSlice.actions;

const state = {
  layout: layoutSlice.reducer,
};

export default state;
