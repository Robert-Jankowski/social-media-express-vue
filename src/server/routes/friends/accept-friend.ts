import { Request, Response} from "express";
import {isNil, includes} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";
import {Server as WebsocketServer} from 'socket.io';

export const acceptFriendHandler = async (req: Request, res: Response) => {

  const io = req.app.get('socketio') as WebsocketServer;

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

    if (!includes(user.friendRequests.map((f) => f.toString()), friend._id.toString())
      || includes(user.friends.map((f) => f.toString()), friend._id.toString())) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    user.friendRequests = user.friendRequests.filter((f) => f.toString() != friend._id.toString());
    user.friends.push(friend._id);
    friend.friends.push(user._id);

    await user.save();
    await friend.save();

    io.emit(`user/${friend._id.toString()}/friends`, {
      username: user.username,
    })

    return res.sendStatus(ResponseCodes.OK);

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR)
  }

}
