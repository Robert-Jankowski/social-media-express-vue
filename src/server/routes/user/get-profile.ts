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
    const profileOwner = await User.findOne({username}) as UserDefinition;

    if (isNil(profileOwner)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send()
    }

    let canBeInvited = false;

    // @ts-ignore
    if(!isNil(req.user)) {
      // @ts-ignore
      const user = await User.findById(req.user.id);

      if(!isNil(user)) {
        canBeInvited = !user.friends
          .map((friend) => friend.toString())
          // @ts-ignore
          .includes(profileOwner._id.toString());
      }
    }

    return res.status(ResponseCodes.OK)
      .send({
        profile: {
          username: profileOwner.username,
          description: profileOwner.description,
          status: profileOwner.status,
          realName: profileOwner.realName,
          tags: profileOwner.tags,
          imageUrl: profileOwner.imageUrl,
        },
        canBeInvited,
      });
  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
}
