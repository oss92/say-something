import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { RecordingCreateWidget } from '../../components/RecordingCreateWidget/RecordingCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addRecording: () => {},
  showAddRecording: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <RecordingCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewRecording" />));
  t.is(wrapper.find('input').length, 1);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <RecordingCreateWidget {...props} />
  );

  t.is(wrapper.prop('addRecording'), props.addRecording);
  t.is(wrapper.prop('showAddRecording'), props.showAddRecording);
});

test('calls addRecording', t => {
  const addRecording = sinon.spy();
  const wrapper = mountWithIntl(
    <RecordingCreateWidget addRecording={addRecording} showAddRecording />
  );

  wrapper.ref('title').value = 'Some Title';

  wrapper.find('a').first().simulate('click');
  // TODO add audio blob test
  // t.truthy(addRecording.calledOnce);
  // t.truthy(addRecording.calledWith('Some Title', 'audio blob'));
});

test('empty form doesn\'t call addRecording', t => {
  const addRecording = sinon.spy();
  const wrapper = mountWithIntl(
    <RecordingCreateWidget addRecording={addRecording} showAddRecording />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addRecording.called);
});
