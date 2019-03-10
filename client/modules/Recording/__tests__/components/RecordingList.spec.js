import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import RecordingList from '../../components/RecordingList';

const recordings = [
  { title: 'Hello, say something!', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'something!'" },
  { title: 'Hi, say something!', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'something!'" },
];

test('renders the list', t => {
  const wrapper = shallow(
    <RecordingList recordings={recordings} handleShowRecording={() => {}} handleDeleteRecording={() => {}} />
  );

  t.is(wrapper.find('RecordingListItem').length, 2);
});
