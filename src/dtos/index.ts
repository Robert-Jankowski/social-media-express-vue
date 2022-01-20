export interface UserDto {
  userId: string;
  username: string;
}

export interface CommentDto {
  content: string;
  author: UserDto;
  comments: CommentDto[];
}

export interface PostDto {
  title: string;
  content: string;
  comments: CommentDto[];
}
