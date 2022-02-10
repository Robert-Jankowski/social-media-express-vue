import { Request, Response} from "express";
import {includes, isEqual, isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";

export const inviteFriendHandler = async (req: Request, res: Response) => {

  const io = req.app.get('socketio');

  // @ts-ignore
  const userId = req.user.id as string;
  const friendUsername = req.params.friendUsername;

  try {

    const user = await User.findById(userId);
    const friend = await User.findOne({username: friendUsername});

    if (isNil(user)) {
      return res.sendStatus(ResponseCodes.FORBIDDEN)
    }

    if (isNil(friend)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    if (isEqual(friend._id, user._id)) {
      return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
    }

    if (includes(friend.friendRequests.map((f) => f.toString()), user._id.toString())) {
      return res.sendStatus(ResponseCodes.ALREADY_EXIST);
    }

    if (includes(friend.friends.map((f) => f.toString()), user._id.toString())) {
      return res.sendStatus(ResponseCodes.NOT_ALLOWED);
    }

    friend.friendRequests.push(user._id);
    await friend.save();

    io.emit(`user/${friend._id.toString()}/requests`, {})
    io.emit(`user/${friend._id.toString()}/request`, {
      username: user.username,
    })

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }

}
