import jwt from 'jsonwebtoken';
import CONFIG from '../config';
import { NextFunction, Request, Response } from "express";
import { ResponseCodes } from "../types/response-codes";
import { tail } from 'lodash';

const exclusions = [
  {
    path: /\/api\/wall\/.*/g,
    method: 'GET'
  },
  {
    path: /\/api\/user\/.*\/profile/g,
    method: 'GET'
  },
];

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {

  const allowWithoutAuth = exclusions.some((exclusion) =>
    exclusion.path.test(req.originalUrl) && exclusion.method === req.method);

  const authHeader = req.headers['authorization'];
  const tokenArr = authHeader && authHeader.split(' ');

  let validated = false;

  for (const token of tail(tokenArr ?? [])) {

    const tokenToTest = token
      .replaceAll('token=', '')
      .replaceAll(';','');

    await jwt.verify(tokenToTest, CONFIG.JWT_SECRET, (err: any, user: any) => {

      if (!err) {
        // @ts-ignore
        req.user = user;
        validated = true;
      }

    })
  }

  console.log(`${req.method} ${req.originalUrl}`, 'exclusion=', allowWithoutAuth, 'validated=', validated)

  if (validated || allowWithoutAuth) {
    return next();
  }

  return res.sendStatus(ResponseCodes.UNAUTHORIZED);
}
