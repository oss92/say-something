import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './RecordingListItem.css';

function RecordingListItem(props) {
  return (
    <div className={styles['single-recording']}>
      <h3 className={styles['recording-title']}>
        <Link to={`/recordings/${props.recording.slug}-${props.recording.cuid}`} >
          {props.recording.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.recording.name}</p>
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
    audio: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RecordingListItem;
