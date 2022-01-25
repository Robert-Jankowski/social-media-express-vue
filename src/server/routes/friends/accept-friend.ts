import {Request, Response} from "express";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";

export const acceptFriendHandler = async (req: Request, res: Response) => {

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

    // @ts-ignore
    if (!user.friendRequests.includes(friend._id)  || user.friends.includes(friend._id)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }
    // @ts-ignore
    user.friendRequests.pull(friend._id);
    // @ts-ignore
    user.friends.push(friend._id);
    // @ts-ignore
    friend.friends.push(user._id);

    await user.save();
    // @ts-ignore
    await friend.save();

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }

}
