import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/RecordingListItem/RecordingListItem.css';

// Import Actions
import { fetchRecording } from '../../RecordingActions';

// Import Selectors
import { getRecording } from '../../RecordingReducer';

export function RecordingDetailPage(props) {
  return (
    <div>
      <Helmet title={props.recording.title} />
      <div className={`${styles['single-recording']} ${styles['recording-detail']}`}>
        <h3 className={styles['recording-title']}>{props.recording.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.recording.name}</p>
        <p className={styles['recording-desc']}>{props.recording.content}</p>
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
    title: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired,
};

export default connect(mapStateToProps)(RecordingDetailPage);