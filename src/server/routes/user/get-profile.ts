import {Request, Response} from "express";
import {User} from "../../models";
import {UserDefinition} from "../../types/model-definitions";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";

export const getProfileHandler = async (req: Request, res: Response) => {

  const { username } = req.params as {
    username: string;
  };

  try {
    // @ts-ignore
    const user = await User.findOne({username}) as UserDefinition;

    if (isNil(user)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send()
    }

    return res.status(ResponseCodes.OK)
      .send({
        username: user.username,
        description: user.description,
        status: user.status,
        realName: user.realName,
        tags: user.tags,
        imageUrl: user.imageUrl,
      });
  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
}
