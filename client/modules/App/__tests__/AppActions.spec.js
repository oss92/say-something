import test from 'ava';
import { actionTest } from 'redux-ava';
import { TOGGLE_ADD_RECORDING, toggleAddRecording } from '../AppActions';

test('should return the correct type for toggleAddRecording', actionTest(toggleAddRecording, null, { type: TOGGLE_ADD_RECORDING }));
