// Export Constants
export const TOGGLE_ADD_RECORDING = 'TOGGLE_ADD_RECORDING';
export const TOGGLE_LOGGED_IN = 'TOGGLE_LOGGED_IN';

// Export Actions
export function toggleAddRecording() {
  return {
    type: TOGGLE_ADD_RECORDING,
  };
}

export function toggleLoggedIn() {
  return {
    type: TOGGLE_LOGGED_IN,
  };
}
