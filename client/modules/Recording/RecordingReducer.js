import { ADD_RECORDING, ADD_RECORDINGS, DELETE_RECORDING } from './RecordingActions';

// Initial State
const initialState = { data: [] };

const RecordingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECORDING :
      return {
        data: [action.recording, ...state.data],
      };

    case ADD_RECORDINGS :
      return {
        data: action.recordings,
      };

    case DELETE_RECORDING :
      return {
        data: state.data.filter(recording => recording.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all recordings
export const getRecordings = state => state.recordings.data;

// Get recording by cuid
export const getRecording = (state, cuid) => state.recordings.data.filter(recording => recording.cuid === cuid)[0];

// Export Reducer
export default RecordingReducer;
