import mandrill from 'mandrill-api/mandrill';
import logger from './logger';
const mandrillClient = new mandrill.Mandrill(process.env.MANDRILL_API_KEY);

export default function sendEmail(title, transcription, recipientEmail, recipientName) {
	var message = {
    "text": `Dear ${recipientName},\nWe are done processing your transcription\n\n\n${transcription}\n\nCheers,\nSay Something!`,
    "subject": `Transcription results: ${title}`,
    "from_email": "saysomething@ossterdam.com",
    "from_name": "Say Something",
    "to": [{
      "email": recipientEmail,
      "name": recipientName,
      "type": "to"
    }],
    "important": false,
    "merge_language": "mailchimp"
	};
	var async = false;
	mandrillClient.messages.send({"message": message, "async": async}, function(result) {
	    logger.debug('Email sent: ' + JSON.stringify(result));
	}, function(e) {
	    logger.error('Mailer error occurred: ' + e.name + ' - ' + e.message);
	});
}