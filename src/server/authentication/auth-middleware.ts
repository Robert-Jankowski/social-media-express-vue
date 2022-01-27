import jwt from 'jsonwebtoken';
import CONFIG from '../config';
import { NextFunction, Request, Response } from "express";
import { ResponseCodes } from "../types/response-codes";
import { tail } from 'lodash';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization'];
  const tokenArr = authHeader && authHeader.split(' ');

  let validated = false;

  for (const token of tail(tokenArr ?? [])) {

    const tokenToTest = token
      .replaceAll('token=', '')
      .replaceAll(';','');

    jwt.verify(tokenToTest, CONFIG.JWT_SECRET, (err: any, user: any) => {

      if (!err) {
        // @ts-ignore
        req.user = user;
        validated = true;
      }

    })
  }

  if (/\/api\/wall\/.+/g.test(req.originalUrl) && req.method === 'GET') {
    return next();
  }

  if (validated) {
    return next();
  }

  return res.sendStatus(ResponseCodes.UNAUTHORIZED);
}
