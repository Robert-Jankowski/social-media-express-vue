import { Schema, model } from 'mongoose';
import { PostDefinition } from "../types/model-definitions";

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
  type: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Post', postSchema);
