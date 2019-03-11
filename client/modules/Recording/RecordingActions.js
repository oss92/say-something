import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_RECORDING = 'ADD_RECORDING';
export const ADD_RECORDINGS = 'ADD_RECORDINGS';
export const DELETE_RECORDING = 'DELETE_RECORDING';

// Export Actions
export function addRecording(recording) {
  return {
    type: ADD_RECORDING,
    recording,
  };
}

export function addRecordingRequest(recording) {
  return (dispatch) => {
    return callApi('recordings', 'post', {
      recording: {
        title: recording.title,
        audio: recording.audio,
      },
    }).then(res => dispatch(addRecording(res.recording)));
  };
}

export function addRecordings(recordings) {
  return {
    type: ADD_RECORDINGS,
    recordings,
  };
}

export function fetchRecordings() {
  return (dispatch) => {
    return callApi('recordings').then(res => {
      dispatch(addRecordings(res.recordings));
    });
  };
}

export function fetchRecording(cuid) {
  return (dispatch) => {
    return callApi(`recordings/${cuid}`).then(res => dispatch(addRecording(res.recording)));
  };
}

export function deleteRecording(cuid) {
  return {
    type: DELETE_RECORDING,
    cuid,
  };
}

export function deleteRecordingRequest(cuid) {
  return (dispatch) => {
    return callApi(`recordings/${cuid}`, 'delete').then(() => dispatch(deleteRecording(cuid)));
  };
}
