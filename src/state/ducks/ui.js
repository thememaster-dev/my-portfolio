import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'uiModal',
  initialState: false,
  reducers: {
    toggleModal: (state, { payload }) => {
      return payload;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

const states = {
  uiModal: modalSlice.reducer,
};

export default states;
