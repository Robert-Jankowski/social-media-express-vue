import {Request} from "express";

export interface UserTokenData {
  id: string;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user: UserTokenData;
}
