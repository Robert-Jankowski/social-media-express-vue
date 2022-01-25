import {Request, Response} from "express";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";

export const inviteFriendHandler = async (req: Request, res: Response) => {
  const {friendUsername, userId} = req.params as {
    friendUsername: string;
    userId: string;
  };

  if (isNil(friendUsername) || isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if (isNil(user) || isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    if (user._id === friend._id) {
      return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
    }

    // @ts-ignore
    if (friend.friendRequests.includes(user._id) || friend.friends.includes(user._id)) {
      return res.sendStatus(ResponseCodes.ALREADY_EXIST);
    }
    // @ts-ignore
    friend.friendRequests.push(user._id);
    // @ts-ignore
    await friend.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }

}
