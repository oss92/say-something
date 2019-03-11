import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Recorder from 'react-mp3-recorder'
import ReactAudioPlayer from 'react-audio-player'
import blobToBuffer from 'blob-to-buffer'

// Import Style
import styles from './RecordingCreateWidget.css';

export class RecordingCreateWidget extends Component {
  addRecording = () => {
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (titleRef.value && this.state.mp3Buffer) {
      this.props.addRecording(titleRef.value, this.state.mp3Buffer);
      titleRef.value = '';
      this.setState({
        mp3Buffer: null,
        url: null
      })
    }
  };

  _onRecordingComplete = (blob) => {
    console.log('state', this.state)

    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err)
        return
      }

      if (this.state && this.state.url) {
        window.URL.revokeObjectURL(this.state.url)
      }

      this.setState({
        mp3Buffer: buffer,
        url: window.URL.createObjectURL(blob)
      })

      console.log('state', this.state)
    })
  }

  _onRecordingError = (err) => {
    console.log('recording error', err)
  }

  render() {
    const cls = `${styles.form} ${(this.props.showAddRecording ? styles.appear : '')}`;
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
