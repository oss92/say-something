import callApi from '../../util/apiCaller';

// Export Constants
export const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';

// Export Actions
export function addUserProfile(userProfile) {
  return {
    type: FETCH_USER_PROFILE,
    userProfile,
  };
}

export function fetchUserProfile() {
  return (dispatch) => {
    return callApi("user").then(res => dispatch(addUserProfile(res)));
  };
}