/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import recordings from './modules/Recording/RecordingReducer';
import userProfile from './modules/Profile/UserProfileReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  recordings,
  userProfile,
  intl,
});
