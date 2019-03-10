import Recording from '../models/recording';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

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
  if (!req.body.recording.name || !req.body.recording.title || !req.body.recording.content) {
    res.status(403).end();
  }

  const newRecording = new Recording(req.body.recording);

  // Let's sanitize inputs
  newRecording.title = sanitizeHtml(newRecording.title);
  newRecording.name = sanitizeHtml(newRecording.name);
  newRecording.content = sanitizeHtml(newRecording.content);

  newRecording.slug = slug(newRecording.title.toLowerCase(), { lowercase: true });
  newRecording.cuid = cuid();
  newRecording.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ recording: saved });
  });
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