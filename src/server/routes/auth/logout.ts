import {Request, Response} from "express";
import {ResponseCodes} from "../../types/response-codes";

export const logoutHandler = (req: Request, res: Response) => {
  // @ts-ignore
  req.logout();
  return res.sendStatus(ResponseCodes.OK);
}
