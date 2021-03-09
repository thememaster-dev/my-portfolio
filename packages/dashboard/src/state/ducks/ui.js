import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    collapsed: false,
  },
  reducers: {
    toggleCollapsed: (state) => {
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    },
  },
});

export const { toggleCollapsed } = layoutSlice.actions;

const state = {
  layout: layoutSlice.reducer,
};

export default state;
