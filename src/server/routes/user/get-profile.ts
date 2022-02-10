import {Request, Response} from "express";
import {User} from "../../models";
import {includes, isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";

export const getProfileHandler = async (req: Request, res: Response) => {

  const username = req.params.username;
  // @ts-ignore
  const userId = req.user.id;

  try {

    const profileOwner = await User.findOne({username});

    if (isNil(profileOwner)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    const user = await User.findById(userId);

    if (isNil(user)) {
      return res.sendStatus(ResponseCodes.FORBIDDEN);
    }

    const canBeInvited = !includes(user.friends.map((f)=>f.toString()), profileOwner._id.toString());

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
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }
}
