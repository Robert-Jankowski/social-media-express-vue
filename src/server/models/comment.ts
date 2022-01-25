import { Schema, model } from 'mongoose';
import { CommentDefinition } from "../types/model-definitions";

const { String, ObjectId } = Schema.Types;

const commentSchema = new Schema<CommentDefinition>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: ObjectId,
    ref: 'Post',
    required: true,
  }
});

export default model('Comment', commentSchema);
