export default {
  locale: 'en',
  messages: {
    siteTitle: 'Say Something!',
    loginWithFacebook: 'Continue with Facebook',
    logout: 'Log out',
    continueAsGuest: 'Continue as guest',
    guestConsequence: 'recordings will be public and no email report on transcription success',
    addRecording: 'Add Recording',
    switchLanguage: 'Switch Language',
    twitterMessage: 'We are on Twitter',
    by: 'By',
    deleteRecording: 'Delete Recording',
    createNewRecording: 'Create new recording',
    recordingTitle: 'Recording Title',
    recordingContent: 'Recording Content',
    submit: 'Submit',
    comment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	}`,
    HTMLComment: `user <b style='font-weight: bold'>{name} </b> {value, plural,
    	  =0 {does not have <i style='font-style: italic'>any</i> comments}
    	  =1 {has <i style='font-style: italic'>#</i> comment}
    	  other {has <i style='font-style: italic'>#</i> comments}
    	}`,
    nestedDateComment: `user {name} {value, plural,
    	  =0 {does not have any comments}
    	  =1 {has # comment}
    	  other {has # comments}
    	} as of {date}`,
  },
};
