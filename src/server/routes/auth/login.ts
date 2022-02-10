import {Request, Response} from "express";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";
import {compareSync} from "bcryptjs";
import {generateAuthToken} from "../../authentication/auth-token-generator";

export const loginHandler = async (req: Request, res: Response) => {

  const { password, username } = req.body as {
    username: string;
    password: string;
  };

  if (isNil(username) || isNil(password)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {
    const user = await User.findOne({username});

    if(isNil(user)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    const verified = compareSync(password, user.password);

    if(!verified) {
      return res.sendStatus(ResponseCodes.UNAUTHORIZED);
    }

    const userTokenData = {
      id: user._id,
      username: user.username,
    };

    const token = generateAuthToken(userTokenData);

    return res
      .status(ResponseCodes.OK)
      .send({
        user: userTokenData,
        token,
        newRequests: user.friendRequests.length > 0,
      });

  } catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }
}
