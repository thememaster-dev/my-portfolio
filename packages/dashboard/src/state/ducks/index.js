import { combineReducers } from '@reduxjs/toolkit';

import ui from './ui';
import authentication from './authentication';

export default combineReducers({
  ...ui,
  ...authentication,
});
