import speech from '@google-cloud/speech';
import logger from './logger';
import toWav from './linear16';
import fs from 'fs';

// Creates a client
const client = new speech.SpeechClient();
  
export function speechToText(file) {
  return toWav(file.path)
  .then(outPath => {
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const wavFile = fs.readFileSync(outPath);

    const audio = {
      content: wavFile.toString('base64'),
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };
    const request = {
      audio: audio,
      config: config,
    };

  // Detects speech in the audio file
  return client
    .recognize(request)
    .then(data => {
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      logger.debug(`Transcription: ${transcription}`);
      return transcription;
    })
    .catch(err => {
      logger.error('ERROR converting speech to text:', err);
    });
  })
  .catch(err => {
    logger.error('ERROR converting to WAV:', err);
  });;

}
