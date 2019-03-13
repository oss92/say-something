import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Recorder from 'react-mp3-recorder'
import ReactAudioPlayer from 'react-audio-player'

// Import Style
import styles from './UserProfileOverview.css';

export class UserProfileOverview extends Component {

  render() {
    return (
      <div className={styles['profile']}>
        <div className={styles['profile-info']}>
          <p className={styles['profile-user-name']}>{this.props.userProfile.name}</p>
          <p className={styles['profile-user-email']}>{this.props.userProfile.email}</p>
        </div>
        <a className={styles['my-recordings-button']} href="/recordings">{"My recordings"}</a>
        <a className={styles['logout-button']} href="/auth/logout">{this.props.intl.messages.logout}</a>
      </div>
    );
  }
}

UserProfileOverview.propTypes = {
  userProfile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired
};

export default injectIntl(UserProfileOverview);
