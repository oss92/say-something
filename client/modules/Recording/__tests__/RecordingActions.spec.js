import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_RECORDING,
  DELETE_RECORDING,
  ADD_RECORDINGS,
  addRecording,
  deleteRecording,
  addRecordings,
} from '../RecordingActions';

const recording = { title: 'Hello, say something!', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'something!'", _id: 1 };

test('should return the correct type for addRecording', actionTest(
  addRecording,
  recording,
  { type: ADD_RECORDING, recording },
));

test('should return the correct type for deleteRecording', actionTest(
  deleteRecording,
  recording.cuid,
  { type: DELETE_RECORDING, cuid: recording.cuid },
));

test('should return the correct type for addRecordings', actionTest(
  addRecordings,
  [recording],
  { type: ADD_RECORDINGS, recordings: [recording] },
));
