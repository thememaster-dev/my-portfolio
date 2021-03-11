import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  reducers: {
    setCurrentUser: (state, { payload: { token } }) => {
      if (typeof token !== 'object' && typeof token !== 'undefined') {
        const decoded = jwtDecode(token);
        localStorage.setItem('jwtToken', token);
        return {
          isAuthenticated: true,
          user: decoded,
        };
      } else {
        return { isAuthenticated: false, user: {} };
      }
    },
    logOutUser: () => {
      localStorage.removeItem('jwtToken');
      return { isAuthenticated: false, user: {} };
    },
  },
});

export const { setCurrentUser, logOutUser } = authSlice.actions;

const state = {
  auth: authSlice.reducer,
};

export default state;
