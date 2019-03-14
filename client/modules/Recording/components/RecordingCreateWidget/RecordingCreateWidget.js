import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Recorder from 'react-mp3-recorder'
import ReactAudioPlayer from 'react-audio-player'

// Import Style
import styles from './RecordingCreateWidget.css';

export class RecordingCreateWidget extends Component {

  componentDidMount() {
    this.setState({
      mp3Blob: null,
      url: null
    })
  }

  addRecording = () => {
    const titleRef = this.refs.title;
    if (titleRef.value && this.state.mp3Blob) {
      this.props.addRecording(titleRef.value, this.state.mp3Blob);
      titleRef.value = '';
      this.setState({
        mp3Blob: null,
        url: null
      })
    }
  };

  _onRecordingComplete = (blob) => {
    if (this.state && this.state.url) {
      window.URL.revokeObjectURL(this.state.url)
    }

    this.setState({
      mp3Blob: blob,
      url: window.URL.createObjectURL(blob)
    })
  }

  _onRecordingError = (err) => {
    console.log('recording error', err)
  }

  render() {
    const cls = styles.form;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewRecording" /></h2>
          <input placeholder={this.props.intl.messages.recordingTitle} className={styles['form-field']} ref="title" />
          <div className={styles['form-recorder']}>
            <Recorder className={styles['form-recorder-button']} onRecordingComplete={this._onRecordingComplete} onRecordingError={this._onRecordingError} />
            <p>
              Click and hold to start recording.
            </p>
            {this.state && this.state.url && (
              <div>
                <ReactAudioPlayer
                  src={this.state.url}
                  controls
                  style={{
                    minWidth: '500px'
                  }}
                />
              </div>
            )}
          </div>
          <a className={styles['recording-submit-button']} href="#" onClick={this.addRecording}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

RecordingCreateWidget.propTypes = {
  addRecording: PropTypes.func.isRequired,
  showAddRecording: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(RecordingCreateWidget);
