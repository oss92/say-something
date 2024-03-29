import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import RecordingListItem from './RecordingListItem/RecordingListItem';

function RecordingList(props) {
  return (
    <div className="listView">
      {
        props.recordings.map(recording => (
          <RecordingListItem
            recording={recording}
            key={recording.cuid}
            onDelete={() => props.handleDeleteRecording(recording.cuid)}
          />
        ))
      }
    </div>
  );
}

RecordingList.propTypes = {
  recordings: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    audio: PropTypes.object.isRequired,
    content: PropTypes.string,
    done: PropTypes.bool.isRequired
  })).isRequired,
  handleDeleteRecording: PropTypes.func.isRequired,
};

export default RecordingList;
