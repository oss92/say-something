import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Actions
import { fetchUserProfile } from '../../../Profile/UserProfileActions';

// Import Selectors
import { getLoggedIn } from '../../../App/AppReducer';
import { getUserProfile } from '../../../Profile/UserProfileReducer';

import LoginWidget from '../../../Profile/components/LoginWidget/LoginWidget';
import UserProfileOverview from '../../../Profile/components/UserProfileOverview/UserProfileOverview';

class HomePage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUserProfile());
  }

  render() {
    return (
      <div>
        {
          this.props.userProfile && this.props.userProfile.email ?
            <UserProfileOverview userProfile={this.props.userProfile}></UserProfileOverview> :
            <LoginWidget ></LoginWidget>
        }
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    userProfile: getUserProfile(state),
  };
}

// Actions required to provide data for this component to render in sever side.
HomePage.need = [fetchUserProfile];

HomePage.propTypes = {
  userProfile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
};

HomePage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(HomePage);
