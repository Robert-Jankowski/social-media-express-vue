import { Schema, model } from 'mongoose';
import {UserDefinition} from "../types/model-definitions";

const { String, ObjectId } = Schema.Types;

const userSchema = new Schema<UserDefinition>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    type: ObjectId,
    ref: 'User',
    required: true,
  }],
  friendRequests: [{
    type: ObjectId,
    ref: 'User',
    required: true,
  }],
  status: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  realName: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  tags: [String],
});

export default model('User', userSchema);
