import { Schema, model } from 'mongoose';
import {MessageDefinition} from "../types/model-types";

const { String, ObjectId, Boolean } = Schema.Types;

const messageSchema = new Schema<MessageDefinition>({
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
