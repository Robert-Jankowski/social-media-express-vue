import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";
import { Request, Response} from "express";

export const getFriendsHandler = async (req: Request , res: Response) => {

  // @ts-ignore
  const userId = req.user.id as string;

try {

  const user = await User
    .findById(userId)
    .populate('friends')
    .populate('friendRequests');

  if (isNil(user)) {
    return res.sendStatus(ResponseCodes.FORBIDDEN);
  }

  // @ts-ignore
  const friends = user.friends.map((el) => el.username)
  // @ts-ignore
  const requests = user.friendRequests.map((el) => el.username)

  return res.status(ResponseCodes.OK).send({
    friends,
    requests,
  });

} catch (error) {
  return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
}

}
