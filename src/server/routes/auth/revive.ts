import {Request, Response} from "express";
import {ResponseCodes} from "../../types/response-codes";
import {UserTokenData} from "../../authentication/auth-types";
import {User} from "../../models";
import { isNil } from "lodash";

export const reviveHandler = async (req: Request, res: Response) => {

  // @ts-ignore
  const userId = req.user.id;

  try {

    const user = await User.findById(userId);

    if (isNil(user)) {
      return res.sendStatus(ResponseCodes.FORBIDDEN);
    }

    return res
      .status(ResponseCodes.OK)
      .send({
        user: {
          id: user._id,
          username: user.username,
        },
        newRequests: user.friendRequests.length > 0,
      });

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }
}
