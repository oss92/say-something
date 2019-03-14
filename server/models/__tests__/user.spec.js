import test from 'ava';
import request from 'supertest';
import app from '../../server';
import User from '../user';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial users added into test db
const users = [
  new User({ name: 'Mohamed Osama', email: 'm@ossterdam.com' }),
  new User({ name: 'Joe Biden', email: 'joe@biden.com' }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two user entries', async () => {
  await User.create(users).catch(() => 'Unable to create users');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const user = new User({ name: 'Mohamed Osama', email: 'm@ossterdam.com' });
  user.save();

  const res = await request(app)
    .get('/api/user')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.user.name, user.name);
});