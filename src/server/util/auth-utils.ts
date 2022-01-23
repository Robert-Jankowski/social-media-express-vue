import { Function } from '@babel/types';
import { isNil } from 'lodash';
import {Error, ObjectId} from 'mongoose';
import { User } from '../models';
import {ResponseCodes} from "./response-codes";
import { Request, Response, NextFunction } from 'express';
import user from "../models/user";


// @ts-ignore
export const verifyUser = async (username: string, password: string, done) => {

  if (isNil(username) || isNil(password)) {
    done(null, null);
  }

  const result = await User.findOne({username, password});

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

    }).clone()
    .catch((error: Error) => {

    });
  return done(null, user);
}

export const userAuthorization = (req: Request, res: Response, next: NextFunction) =>
  // @ts-ignore
  req.isAuthenticated() ?
    next() :
    res.sendStatus(ResponseCodes.UNAUTHORIZED);


export const isFriend = async (userId: ObjectId, friendId: ObjectId): Promise<boolean | undefined> => {

  const friend = await User.findById(friendId);

  if (isNil(friend)) {
    return false;
  }

  return friend.friends.includes(userId);
}
