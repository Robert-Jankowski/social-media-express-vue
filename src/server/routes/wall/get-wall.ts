import { Request, Response } from 'express';
import { Comment, Post, User } from '../../models';
import { isNil, omit, reverse } from 'lodash';
import { ResponseCodes } from '../../types/response-codes';
import { PostTypes } from '../../types/post-types';

export const getWallHandler = async (req: Request, res: Response) => {

  // @ts-ignore
  const userId = req.user?.id;
  const username = req.params.username;

  try {

    const wallOwner = await User.findOne({username});

    if(isNil(wallOwner)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    const wallOwnerId = wallOwner._id;
    const isAuthenticated = !isNil(userId);

    const posts = await Post.find({type: PostTypes.PUBLIC, author: wallOwnerId});
    const postsWithComments = await Promise.all(posts.map( async(post) => {
      const comments = await Comment.find({post: post._id}).populate('author');
      return {
        id: post._id,
        title: post.title,
        content: post.content,
        author: post.author,
        comments: comments
          .map((comment) => ({
            id: comment._id,
            content: comment.content,
            // @ts-ignore
            author: comment.author.username,
          }))
      }}));

    return res
      .status(ResponseCodes.OK)
      .send(isAuthenticated ?
        reverse(postsWithComments) :
        omit(reverse(postsWithComments), 'comments'));

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }
}
