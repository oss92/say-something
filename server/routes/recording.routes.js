import { Router } from 'express';
import * as RecordingController from '../controllers/recording.controller';
const router = new Router();

// Get all Recordings
router.route('/recordings').get(RecordingController.getRecordings);

// Get one recording by cuid
router.route('/recordings/:cuid').get(RecordingController.getRecording);

// Add a new Recording
router.route('/recordings').post(RecordingController.addRecording);

// Delete a recording by cuid
router.route('/recordings/:cuid').delete(RecordingController.deleteRecording);

export default router;
