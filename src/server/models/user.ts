import { Schema, model } from 'mongoose';

const { String, ObjectId } = Schema.Types;

interface User {
  login: string;
  password: string;
  friends: Schema.Types.ObjectId[];
  friendRequests: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  posts: Schema.Types.ObjectId[];
}

const userSchema = new Schema<User>({
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
