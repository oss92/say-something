import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import RecordingList from '../../components/RecordingList';
import RecordingCreateWidget from '../../components/RecordingCreateWidget/RecordingCreateWidget';

// Import Actions
import { addRecordingRequest, fetchRecordings, deleteRecordingRequest } from '../../RecordingActions';
import { toggleAddRecording } from '../../../App/AppActions';

// Import Selectors
import { getShowAddRecording } from '../../../App/AppReducer';
import { getRecordings } from '../../RecordingReducer';

class RecordingListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchRecordings());
  }

  handleDeleteRecording = recording => {
    if (confirm('Do you want to delete this recording')) { // eslint-disable-line
      this.props.dispatch(deleteRecordingRequest(recording));
    }
  };

  handleAddRecording = (title, audio) => {
    this.props.dispatch(toggleAddRecording());
    this.props.dispatch(addRecordingRequest({ title, audio }));
  };

  render() {
    return (
      <div>
        <RecordingCreateWidget addRecording={this.handleAddRecording} showAddRecording={this.props.showAddRecording} />
        <RecordingList handleDeleteRecording={this.handleDeleteRecording} recordings={this.props.recordings} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
RecordingListPage.need = [() => { return fetchRecordings(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddRecording: getShowAddRecording(state),
    recordings: getRecordings(state),
  };
}

RecordingListPage.propTypes = {
  recordings: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    audio: PropTypes.object.isRequired,
    content: PropTypes.string,
  })).isRequired,
  showAddRecording: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

RecordingListPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(RecordingListPage);
