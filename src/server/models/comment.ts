import { Schema, model } from 'mongoose';
import { CommentDefinition } from "../types/model-types";

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
});

export default model('Comment', commentSchema);
