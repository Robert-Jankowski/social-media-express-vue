import {Request, Response, Router} from 'express';
import {PostTypes, WallTypes} from "../types/enums";
import {ResponseCodes} from "../util/response-codes";
import {Post} from "../models";
import {omit} from 'lodash';
import {isFriend} from "../util/auth-utils";
import {Schema, Types} from 'mongoose'

// COMMON PATH - /wall/:userId/:wallType
// wallType = 'public' | 'private'

const routes = Router();

// Method:        GET
// Summary:       get user wall
// Description:   if wall is public and user not logged - get wall without comments / if friend - get public or private
// Permissions:   public - anyone / private - user or friends
// Response:      { posts }
routes.get('/', async (req: Request, res: Response) => {

  const {userId, wallType} = req.params as {
    userId: string;
    wallType: WallTypes;
  };

  try {

    // @ts-ignore
    const isAuthenticated = req.isAuthenticated();

    if (wallType === WallTypes.PUBLIC) {
      const posts = Post.find({author: userId, type: PostTypes.PUBLIC || PostTypes.GENERAL});


      return res.status(ResponseCodes.OK).send(
        isAuthenticated ? posts : omit(posts, 'comments'));
    }

    if (
      wallType === WallTypes.PRIVATE &&
      isAuthenticated &&
      await isFriend(new Schema.Types.ObjectId(userId), req.body.user)) {
        // TODO - naprawic
        const posts = Post.find({author: userId, type: PostTypes.PRIVATE || PostTypes.GENERAL});

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
