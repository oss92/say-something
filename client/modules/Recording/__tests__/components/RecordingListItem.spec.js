import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import RecordingListItem from '../../components/RecordingListItem/RecordingListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const recording = { title: 'Hello, Say Something', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'something!'" };
const props = {
  recording,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <RecordingListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-recording'));
  t.is(wrapper.find('Link').first().prop('children'), recording.title);
  t.regex(wrapper.find('.author-name').first().text(), new RegExp(recording.name));
  t.is(wrapper.find('.recording-desc').first().text(), recording.content);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <RecordingListItem {...props} />
  );

  t.deepEqual(wrapper.prop('recording'), props.recording);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <RecordingListItem recording={recording} onDelete={onDelete} />
  );

  wrapper.find('.recording-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
