import { Function } from '@babel/types';
import { isNil } from 'lodash';
import {Error, ObjectId} from 'mongoose';
import { User } from '../models';
import {ResponseCodes} from "./response-codes";
import { Request, Response, NextFunction } from 'express';
import user from "../models/user";


// @ts-ignore
export const verifyUser = async (login: string, password: string, done) => {

  if (isNil(login) || isNil(password)) {
    done(null, null);
  }

  const result = await User.findOne({login, password});

  if (result !== null) {
    done(null, result);
  } else {
    done(null, null);
  }
};

// @ts-ignore
export const userSerializer = (user, done) => {
  done(null, user._id);
};

// @ts-ignore
export const userDeserializer = async (id, done) => {
  const user = await User
    .findById(id, (err: Error) => {
      console.log(err);
    }).clone()
    .catch((error: Error) => {
      console.log(error);
    });
  return done(null, user);
}

export const userAuthorization = (req: Request, res: Response, next: NextFunction) =>
  // @ts-ignore
  req.isAuthenticated() ?
    next() :
    res.sendStatus(ResponseCodes.UNAUTHORIZED);


// export const friendAuthorization = async (req: Request, res: Response, next: NextFunction) => {
//
//   const targetUserId = req.params.id;
//   const userId = req.body;
//   console.log(req.user)
//
//   if (isNil(targetUserId) || isNil(userId)) {
//     return res.sendStatus(ResponseCodes.UNAUTHORIZED);
//   }
//
//   const user = await User.find({_id: userId});
//   console.log(user)
//
//   if(isNil(user)) {
//     return res.sendStatus(ResponseCodes.UNAUTHORIZED);
//   }
//
//   return next();
// }

export const isFriend = async (userId: ObjectId, friendId: ObjectId): Promise<boolean | undefined> => {

  const user = await User.findById(userId);

  if (isNil(user)) {
    return undefined;
  }

  return user.friends.includes(friendId);
}
