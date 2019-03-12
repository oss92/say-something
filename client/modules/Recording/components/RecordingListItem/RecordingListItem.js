import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import ReactAudioPlayer from 'react-audio-player'

// Import Style
import styles from './RecordingListItem.css';

function RecordingListItem(props) {
  return (
    <div className={styles['single-recording']}>
      <h3 className={styles['recording-title']}>
        <Link to={`/recordings/${props.recording.cuid}`} >
          {props.recording.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> Guest</p>
      <p className={styles['recording-desc']}>{props.recording.content}</p>
      <p className={styles['recording-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteRecording" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

RecordingListItem.propTypes = {
  recording: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    audio: PropTypes.object.isRequired,
    content: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RecordingListItem;
