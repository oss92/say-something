import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Recording from '../recording';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial recordings added into test db
const recordings = [
  new Recording({ title: 'Hello, say something!', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'something!'" }),
  new Recording({ title: 'Hi, say something!', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'something!'" }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two recording entries', async () => {
  await Recording.create(recordings).catch(() => 'Unable to create recordings');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Recordings', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/recordings')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(recordings.length, res.body.recordings.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const recording = new Recording({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello! Say something' });
  recording.save();

  const res = await request(app)
    .get('/api/recordings/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.recording.name, recording.name);
});

test.serial('Should correctly add a recording', async t => {
  t.plan(2);

  const res = await request(app)
    .recording('/api/recordings')
    .send({ recording: { name: 'Foo', title: 'bar', content: 'Hello! Say something' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedRecording = await Recording.findOne({ title: 'bar' }).exec();
  t.is(savedRecording.name, 'Foo');
});

test.serial('Should correctly delete a recording', async t => {
  t.plan(2);

  const recording = new Recording({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello! Say something' });
  recording.save();

  const res = await request(app)
    .delete(`/api/recordings/${recording.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedRecording = await Recording.findOne({ cuid: recording.cuid }).exec();
  t.is(queriedRecording, null);
});
