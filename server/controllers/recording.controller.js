import Recording from '../models/recording';
import cuid from 'cuid';
import formidable from 'formidable';
import sanitizeHtml from 'sanitize-html';
import logger from '../util/logger';
import { speechToText } from '../util/transcription';
import fs from 'fs';

/**
 * Get all recordings
 * @param req
 * @param res
 * @returns void
 */
export function getRecordings(req, res) {
  Recording.find().sort('-dateAdded').exec((err, recordings) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recordings });
  });
}

/**
 * Save a recording
 * @param req
 * @param res
 * @returns void
 */
export function addRecording(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send(err);
      return
    }

    if (!req.user) {
      res.status(403).end();
      return
    }

    if (!fields.title || !files.audio) {
      logger.debug("missing required fields for recording");
      res.status(403).end();
    }

    const newRecording = new Recording({});

    // Let's sanitize inputs
    newRecording.title = sanitizeHtml(fields.title);
    newRecording.audio = fs.readFileSync(files.audio.path);
    newRecording.cuid = cuid();
    newRecording.userId = req.user._id;
    speechToText(files.audio).then(content => {
      newRecording.content = content;
      logger.debug("constructed recording " + newRecording);

      newRecording.save((err, saved) => {
        if (err) {
          logger.error("error saving recording " + err);
          res.status(500).send(err);
        }
        logger.debug("saved recording " + saved);
        res.json({ recording: saved });
      });
    });
  })
}

/**
 * Get a single recording
 * @param req
 * @param res
 * @returns void
 */
export function getRecording(req, res) {
  Recording.findOne({ cuid: req.params.cuid }).exec((err, recording) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recording });
  });
}

/**
 * Delete a recording
 * @param req
 * @param res
 * @returns void
 */
export function deleteRecording(req, res) {
  Recording.findOne({ cuid: req.params.cuid }).exec((err, recording) => {
    if (err) {
      res.status(500).send(err);
    }

    recording.remove(() => {
      res.status(200).end();
    });
  });
}
