import {Request, Response} from "express";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";

export const editProfileHandler = async (req: Request, res: Response) => {

  const { realName, status, description, tags, imageUrl } = req.body as {
    realName: string;
    status: string;
    description: string;
    tags: string[];
    imageUrl: string;
  };

  const userId = req.params.userId;

  if (isNil(userId)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  const user = await User.findById(userId);

  if (isNil(user)) {
    return res.sendStatus(ResponseCodes.NOT_FOUND);
  }

  user.realName = realName;
  user.status = status;
  user.description = description;
  user.tags = tags ?? [];
  user.imageUrl = imageUrl;

  await user.save();

  return res.send().status(200);
}
