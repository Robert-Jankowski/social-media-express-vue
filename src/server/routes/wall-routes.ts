import {Request, Response, Router} from 'express';
import {PostTypes, WallTypes} from "../types/enums";
import {ResponseCodes} from "../util/response-codes";
import {Post, User} from "../models";
import {omit, reverse, isNil} from 'lodash';
import {isFriend} from "../util/auth-utils";
import { mongo, Types } from 'mongoose'

// COMMON PATH - /wall/:username
// wallType = 'public' | 'private'

const routes = Router();

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

    const user = await User.find({username});

    if(isNil(user)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send();
    }

    // @ts-ignore
    const userId = user._id;

    // @ts-ignore
    const isAuthenticated = req.isAuthenticated();

    if (!isPrivate) {
      const posts = await Post.find({author: userId.toString(), type: PostTypes.PUBLIC || PostTypes.GENERAL});


      return res.status(ResponseCodes.OK).send(
        isAuthenticated ? reverse(posts) : omit(reverse(posts), 'comments'));
    }

    if (
      isPrivate &&
      isAuthenticated &&
      await isFriend(userId, req.body.user)) {

        const posts = Post.find({author: userId.toString(), type: PostTypes.PRIVATE || PostTypes.GENERAL});

        return res
          .status(ResponseCodes.OK)
          .send(posts);
    }

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
});


// Method:        POST
// Summary:       post comment to wall
// Description:   check permissions, if successful notify everyone seeing board
// Permissions:   public - anyone logged / private - user or friends
// Body:          { commentContent, ? commentKey ? }
// Response:      { wall }
routes.post('/', (req: Request, res: Response) => {
  return res.send().status(200);
});

export default routes;
