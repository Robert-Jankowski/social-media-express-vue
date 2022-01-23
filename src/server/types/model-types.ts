import {Schema} from "mongoose";

// MODEL INTERFACES
export interface CommentDefinition {
  content: string;
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
}

export interface PostDefinition {
  title: string;
  content: string;
  type: string,
  author: Schema.Types.ObjectId;
}

export interface UserDefinition {
  username: string;
  password: string;
  friends: Schema.Types.ObjectId[];
  friendRequests: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  tags: string[];
  status?: string;
  description?: string;
  realName?: string;
  imageUrl?: string;
}
