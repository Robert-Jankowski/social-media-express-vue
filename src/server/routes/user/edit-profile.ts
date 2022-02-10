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

  // @ts-ignore
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (isNil(user)) {
    return res.sendStatus(ResponseCodes.FORBIDDEN);
  }

  user.realName = realName;
  user.status = status;
  user.description = description;
  user.tags = tags ?? [];
  user.imageUrl = imageUrl;

  await user.save();

  return res.send().status(200);
}
