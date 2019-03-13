import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Recorder from 'react-mp3-recorder'
import ReactAudioPlayer from 'react-audio-player'

// Import Style
import styles from './LoginWidget.css';

export class LoginWidget extends Component {

  render() {
    return (
      <div className={styles['login']}>
        <a className={styles['fb-login-button']} href="/auth/facebook">{this.props.intl.messages.loginWithFacebook}</a>
      </div>
    );
  }
}

LoginWidget.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(LoginWidget);
