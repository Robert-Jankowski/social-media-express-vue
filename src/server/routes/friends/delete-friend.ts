import { Request, Response} from "express";
import {includes, isNil} from "lodash";
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

    if (!includes(user.friends.map((f) => f.toString()), friend._id.toString())) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    user.friends = user.friends.filter((f) => f.toString() != friend._id.toString());
    friend.friends = friend.friends.filter((f) => f.toString() != user._id.toString());

    await user.save();
    await friend.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }

}
