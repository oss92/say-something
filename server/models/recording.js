import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
  cuid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  audio: { type: 'Buffer', required: true },
  content: { type: 'String', required: false },
  userId: { type: 'String', required: true },
  userName: { type: 'String', required: true },
  done: { type: 'Boolean', required: true, default: false },
  created: { type: 'Date', default: Date.now },
});

export default mongoose.model('Recording', recordingSchema);
