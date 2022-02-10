import { Request, Response} from "express";
import {find, isNil, reject} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";

export const deleteFriendHandler = async (req: Request, res: Response) => {

  // @ts-ignore
  const userId = req.user.id as string;
  const friendUsername = req.params.friendUsername;

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if(isNil(user)) {
      return res.sendStatus(ResponseCodes.FORBIDDEN);
    }

    if (isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    if (!find(user.friends, friend._id)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    user.friends = reject(user.friends, friend._id);
    friend.friends = reject(user.friends, user._id);

    await user.save();
    await friend.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }

}
