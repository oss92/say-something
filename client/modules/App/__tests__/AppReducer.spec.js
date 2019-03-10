import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddRecording } from '../AppReducer';
import { toggleAddRecording } from '../AppActions';

test('action for TOGGLE_ADD_RECORDING is working', reducerTest(
  appReducer,
  { showAddRecording: false },
  toggleAddRecording(),
  { showAddRecording: true },
));

test('getShowAddRecording selector', t => {
  t.is(getShowAddRecording({
    app: { showAddRecording: false },
  }), false);
});
