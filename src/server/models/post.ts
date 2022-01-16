import { Schema, model } from 'mongoose';

const { String, ObjectId } = Schema.Types;

interface Post {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId;
}

const postSchema = new Schema<Post>({
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
