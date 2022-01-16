import { Schema, model } from 'mongoose';

const { String, ObjectId, Boolean } = Schema.Types;

interface Message {
  content: string;
  from: Schema.Types.ObjectId;
  unread: boolean;
}

const messageSchema = new Schema<Message>({
  content: {
    type: String,
    required: true,
  },
  from: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  unread: {
    type: Boolean,
    required: true,
  },
});

export default model('Message', messageSchema);
