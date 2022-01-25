import { Request, Response } from 'express';
import { Comment, Post, User } from '../../models';
import { isNil, reverse } from 'lodash';
import { ResponseCodes } from '../../types/response-codes';
import { PostTypes } from '../../types/post-types';
import { isFriend } from '../../authentication/is-friend-auth';

export const getPrivateWallHandler = async (req: Request, res: Response) => {

  const { username } = req.params as {
    username: string;
  };

  try {

    const wallOwner = await User.findOne({username});

    if (isNil(wallOwner)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    // @ts-ignore
    const wallOwnerId = wallOwner._id;
    // @ts-ignore
    const userId = req.user?.id;

    const friend = await isFriend(userId, wallOwnerId);
    const allowed = wallOwnerId.toString() === userId.toString() || friend;

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
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
}
