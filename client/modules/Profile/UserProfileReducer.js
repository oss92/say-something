import { FETCH_USER_PROFILE } from './UserProfileActions';

// Initial State
const initialState = { data: null };

const UserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE :
      return {
        data: action.userProfile == {} ? null : action.userProfile,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get profile
export const getUserProfile = (state) => {
	return state.userProfile && state.userProfile.data;
}

// Export Reducer
export default UserProfileReducer;
