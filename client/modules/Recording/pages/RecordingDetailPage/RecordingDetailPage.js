import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Images
import success from '../../success.png';
import error from '../../error.png';

// Import Style
import styles from '../../components/RecordingListItem/RecordingListItem.css';

// Import Actions
import { fetchRecording } from '../../RecordingActions';

// Import Selectors
import { getRecording } from '../../RecordingReducer';

export function RecordingDetailPage(props) {
  const statusImage = props.recording.done ? success : error;
  return (
    <div>
      <Helmet title={props.recording.title} />
      <div className={`${styles['single-recording']} ${styles['recording-detail']}`}>
        <div className={styles['single-recording-status']}>
          <img src={statusImage}/>
        </div>
        <div className={styles['single-recording-data']}>
          <h3 className={styles['recording-title']}>{props.recording.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {props.recording.name}</p>
          <p className={styles['recording-desc']}>{props.recording.content}</p>
        </div>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
RecordingDetailPage.need = [params => {
  return fetchRecording(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    recording: getRecording(state, props.params.cuid),
  };
}

RecordingDetailPage.propTypes = {
  recording: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    audio: PropTypes.object.isRequired,
    content: PropTypes.string,
    done: PropTypes.bool.isRequired
  }).isRequired,
};

export default connect(mapStateToProps)(RecordingDetailPage);
