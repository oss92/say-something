// Import Actions
import { TOGGLE_ADD_RECORDING, TOGGLE_LOGGED_IN } from './AppActions';

// Initial State
const initialState = {
  showAddRecording: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_RECORDING:
      return {
        showAddRecording: !state.showAddRecording,
      };

    case TOGGLE_LOGGED_IN:
      return {
        loggedIn: !state.loggedIn,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddRecording
export const getShowAddRecording = state => state.app.showAddRecording;

// Get getLoggedIn
export const getLoggedIn = state => state.app.loggedIn;

// Export Reducer
export default AppReducer;
