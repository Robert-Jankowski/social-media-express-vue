import { Schema, model } from 'mongoose';
import {UserDefinition} from "../types/model-types";

const { String, ObjectId } = Schema.Types;

const userSchema = new Schema<UserDefinition>({
  login: {
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
  messages: [{
    type: ObjectId,
    ref: 'Message',
    required: true,
  }],
  posts: [{
    type: ObjectId,
    ref: 'Post',
    required: true,
  }],
});

export default model('User', userSchema);
