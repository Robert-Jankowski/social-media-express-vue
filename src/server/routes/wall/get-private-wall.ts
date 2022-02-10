import { Request, Response } from 'express';
import { Comment, Post, User } from '../../models';
import {isEqual, isNil, reverse } from 'lodash';
import { ResponseCodes } from '../../types/response-codes';
import { PostTypes } from '../../types/post-types';
import { isFriend } from '../../authentication/is-friend-auth';

export const getPrivateWallHandler = async (req: Request, res: Response) => {

  // @ts-ignore
  const userId = req.user.id as string;
  const username = req.params.username;

  try {

    const wallOwner = await User.findOne({username});

    if (isNil(wallOwner)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    if (isNil(await User.findById(userId))) {
      return res.sendStatus(ResponseCodes.FORBIDDEN);
    }

    const wallOwnerId = wallOwner._id.toString();

    const friend = await isFriend(userId, wallOwnerId);
    const allowed = isEqual(wallOwnerId, userId) || friend;

    if(!allowed) {
      return res.sendStatus(ResponseCodes.UNAUTHORIZED);
    }

    const posts = await Post.find({type: PostTypes.PRIVATE, author: wallOwnerId});
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
      .send(reverse(postsWithComments));

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }
}
