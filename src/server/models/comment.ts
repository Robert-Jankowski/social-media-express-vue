import { Schema, model } from 'mongoose';

const { String, ObjectId } = Schema.Types;

interface Comment {
  content: string;
  author: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId;
}

const commentSchema = new Schema<Comment>({
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

export default model('Comment', commentSchema);
