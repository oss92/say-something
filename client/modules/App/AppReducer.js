// Import Actions
import { TOGGLE_ADD_RECORDING } from './AppActions';

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

    default:
      return state;
  }
};

/* Selectors */

// Get showAddRecording
export const getShowAddRecording = state => state.app.showAddRecording;

// Export Reducer
export default AppReducer;
