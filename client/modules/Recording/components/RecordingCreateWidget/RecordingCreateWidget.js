import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './RecordingCreateWidget.css';

export class RecordingCreateWidget extends Component {
  addRecording = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addRecording(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddRecording ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewRecording" /></h2>
          <input placeholder={this.props.intl.messages.recordingTitle} className={styles['form-field']} ref="title" />
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
