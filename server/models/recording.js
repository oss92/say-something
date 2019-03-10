import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  audio: { type: 'String', required: true },
  content: { type: 'String', required: true },
  done: { type: 'Boolean', required: true, default: false }
});

export default mongoose.model('Recording', recordingSchema);