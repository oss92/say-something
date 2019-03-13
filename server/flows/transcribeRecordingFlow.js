import Recording from '../models/recording';
import logger from '../util/logger';
import { speechToText } from '../util/transcription';
import sendEmail from '../util/mailer';

export default function speechToTextFlow(recordingCuid, audioFile, user) {
  speechToText(audioFile).then(content => {
  	Recording.findOne({ cuid: recordingCuid }).exec((err, recording) => {
	    if (err) {
	      logger.error(`failed to fetch recording with ID ${recordingCuid}: ${err}`);
	    }
	    recording.content = content;
	    recording.done = true;
	    recording.save((err, saved) => {
        if (err) {
          logger.error(`error saving recording with transcribed content: ${err}`);
        }

        logger.debug(`saved recording ${saved}`);
        sendEmail(recording.title, recording.content, user.email, user.name);
      });
	  });      
  });
}