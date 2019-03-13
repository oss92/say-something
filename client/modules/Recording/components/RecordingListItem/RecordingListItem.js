import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Images
import success from '../../success.png';
import error from '../../error.png';

// Import Style
import styles from './RecordingListItem.css';

function RecordingListItem(props) {
  const statusImage = props.recording.done ? success : error;
  return (
    <div className={styles['single-recording']}>
      <div className={styles['single-recording-status']}>
        <img src={statusImage}/>
      </div>
      <div className={styles['single-recording-data']}>
        <h3 className={styles['recording-title']}>
          <Link to={`/recordings/${props.recording.cuid}`} >
            {props.recording.title}
          </Link>
        </h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.recording.userName}</p>
        <p className={styles['recording-desc']}>{props.recording.content}</p>
        <p className={styles['recording-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteRecording" /></a></p>
      </div>
      <hr className={styles.divider} />
    </div>
  );
}

RecordingListItem.propTypes = {
  recording: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    audio: PropTypes.object.isRequired,
    content: PropTypes.string,
    done: PropTypes.bool.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RecordingListItem;
