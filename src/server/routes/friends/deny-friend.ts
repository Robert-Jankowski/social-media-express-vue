import { Request, Response} from "express";
import {includes, isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";

export const denyFriendHandler = async (req: Request, res: Response) => {

  // @ts-ignore
  const userId = req.user.id as string;
  const friendUsername = req.params.friendUsername;

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if(isNil(user)) {
      return res.sendStatus(ResponseCodes.FORBIDDEN)
    }

    if (isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    if (!includes(user.friendRequests.map((f) => f.toString()), friend._id.toString()) ||
        includes(user.friends.map((f) => f.toString()), friend._id.toString())) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    user.friendRequests = user.friendRequests.filter((f) => f.toString() !== friend._id.toString());
    await user.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res
      .sendStatus(ResponseCodes.INTERNAL_ERROR)
  }

}
