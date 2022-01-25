import {Request, Response} from "express";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {User} from "../../models";
import {hashSync} from "bcryptjs";
import {generateAuthToken} from "../../authentication/auth-token-generator";

export const registerHandler = async (req: Request, res: Response) => {

  try {

    const { password, username } = req.body as {
      username: string;
      password: string;
    }

    if (isNil(username) || isNil(password)) {
      return res
        .status(ResponseCodes.WRONG_BODY_CONTENT)
    }

    if (await User.exists({username})) {
      return res
        .status(ResponseCodes.ALREADY_EXIST)
    }

    const hashedPassword = hashSync(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      friends: [],
      friendRequests: [],
      tags: [],
    })

    const saved = await newUser.save();

    const userTokenData = {
      id: saved._id,
      username: saved.username,
    }

    const token = generateAuthToken(userTokenData);

    return res
      .status(ResponseCodes.CREATED).send({
        user: userTokenData,
        token,
      });

  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
  }
}
