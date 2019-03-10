import test from 'ava';
import { reducerTest } from 'redux-ava';
import recordingReducer, { getRecording, getRecordings } from '../RecordingReducer';
import { addRecording, deleteRecording, addRecordings } from '../RecordingActions';

test('action for ADD_POST is working', reducerTest(
  recordingReducer,
  { data: ['foo'] },
  addRecording({
    name: 'prank',
    title: 'first recording',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-recording',
  }),
  { data: [{
    name: 'prank',
    title: 'first recording',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-recording',
  }, 'foo'] },
));

test('action for DELETE_POST is working', reducerTest(
  recordingReducer,
  { data: [{
    name: 'prank',
    title: 'first recording',
    content: 'Hello world!',
    cuid: 'abc',
    _id: 1,
    slug: 'first-recording',
  }] },
  deleteRecording('abc'),
  { data: [] },
));

test('action for ADD_POSTS is working', reducerTest(
  recordingReducer,
  { data: [] },
  addRecordings([
    {
      name: 'prank',
      title: 'first recording',
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-recording',
    },
  ]),
  { data: [{
    name: 'prank',
    title: 'first recording',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-recording',
  }] },
));

test('getRecordings selector', t => {
  t.deepEqual(
    getRecordings({
      recordings: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getRecording selector', t => {
  t.deepEqual(
    getRecording({
      recordings: { data: [{ cuid: '123' }] },
    }, '123'),
    { cuid: '123' }
  );
});

