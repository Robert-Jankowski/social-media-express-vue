import { Schema, model } from 'mongoose';
import { PostDefinition } from "../types/model-types";

const { String, ObjectId } = Schema.Types;

const postSchema = new Schema<PostDefinition>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment',
    required: true,
  }],
});

export default model('Post', postSchema);
