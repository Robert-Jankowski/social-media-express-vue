import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";
import {Request, Response} from "express";

export const getFriendsHandler = async (req: Request , res: Response) => {

  const {userId} = req.params as {
    userId: string;
  };

  if (isNil(userId)) {
  return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
}

try {

  const user = await User
    .findById(userId)
    .populate('friends')
    .populate('friendRequests');

  if (isNil(user)) {
    return res.sendStatus(ResponseCodes.NOT_FOUND);
  }

  // @ts-ignore
  const friends = await user.friends.map((el) => el.username)
  // @ts-ignore
  const requests = await user.friendRequests.map((el) => el.username)

  return res.status(ResponseCodes.OK).send({
    friends,
    requests,
  });

} catch (error) {
  return res
    .status(ResponseCodes.INTERNAL_ERROR)
    .send()
}

}
