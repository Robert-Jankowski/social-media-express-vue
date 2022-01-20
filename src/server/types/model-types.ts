import {Schema} from "mongoose";

// MODEL INTERFACES
export interface CommentDefinition {
  content: string;
  author: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
}

export interface MessageDefinition {
  content: string;
  from: Schema.Types.ObjectId;
  unread: boolean;
}

export interface PostDefinition {
  title: string;
  content: string;
  type: string,
  author: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
}

export interface UserDefinition {
  login: string;
  username: string;
  password: string;
  friends: Schema.Types.ObjectId[];
  friendRequests: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  posts: Schema.Types.ObjectId[];
}
