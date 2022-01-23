import {Request, Response, Router} from 'express';
import {PostTypes, WallTypes} from "../types/enums";
import {ResponseCodes} from "../util/response-codes";
import {Post, User, Comment} from "../models";
import {omit, reverse, isNil} from 'lodash';
import {isFriend} from "../util/auth-utils";
import { mongo, Types } from 'mongoose'

// COMMON PATH - /wall/:username
// wallType = 'public' | 'private'

const routes = Router({mergeParams: true});

// Method:        GET
// Summary:       get user wall
// Description:   if wall is public and user not logged - get wall without comments / if friend - get public or private
// Permissions:   public - anyone / private - user or friends
// Query:         { isPrivate: boolean}
// Response:      { posts }
routes.get('/', async (req: Request, res: Response) => {

  const { username } = req.params as {
    username: string;
  };

  const isPrivate = req.query?.isPrivate;

  try {

    const wallOwner = await User.findOne({username});

    if(isNil(wallOwner)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send();
    }

    // @ts-ignore
    const wallOwnerId = wallOwner._id;
    // @ts-ignore
    const userId = req?.user?._id;

    // @ts-ignore
    const isAuthenticated = req.isAuthenticated();

    if (!isPrivate) {
      const posts = await Post.find({type: PostTypes.PUBLIC, author: wallOwnerId});
      const postsWithComments = await Promise.all(posts.map( async(post) => {
        const comments = await Comment.find({post: post._id}).populate('author');
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.content,
          comments: isAuthenticated ? comments
            .map((comment) => ({
              content: comment.content,
              // @ts-ignore
              author: comment.author.username,
            })) : [],
        }}));

      return res.status(ResponseCodes.OK).send(reverse(postsWithComments));
    }

    const allowed = wallOwnerId.toString() === userId.toString() || await isFriend(userId, wallOwnerId);

    if (
      isPrivate &&
      isAuthenticated &&
      allowed) {

      const posts = await Post.find({type: PostTypes.PRIVATE, author: wallOwnerId});
      const postsWithComments = await Promise.all(posts.map( async(post) => {
        const comments = await Comment.find({post: post._id}).populate('author');;
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.content,
          comments: comments
            .map((comment) => ({
              content: comment.content,
              // @ts-ignore
              author: comment.author.username,
            }))
        }}));

      return res.status(ResponseCodes.OK).send(
        isAuthenticated ? reverse(postsWithComments) : omit(reverse(postsWithComments), 'comments'));

    }

    return res.sendStatus(ResponseCodes.UNAUTHORIZED);

  } catch (error) {
    console.log(error)
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
});

export default routes;
