import {Router, Request, Response} from 'express';
import {userAuthorization} from "../util/auth-utils";
import {ResponseCodes} from "../util/response-codes";
import {Post, User} from "../models";
import {isNil} from 'lodash';

// COMMON PATH - /user

const routes = Router();

// Method:        GET
// Summary:       get user data
// Description:
// Permissions:   user/friends
// Response:      { ...userData }
routes.get('/:id', userAuthorization, async (req: Request, res: Response) => {

  const {id: userId} = req.params as {
    id: string;
  };

  try {
    const user = await User.findById(userId);

    if (isNil(user)) {
      return res
        .status(ResponseCodes.NOT_FOUND)
        .send()
    }

    return res.status(ResponseCodes.OK).send({
      username: user.username,
      friends: user.friends,
      posts: user.posts,
    });
  } catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
});

// Method:        POST
// Summary:       add new post (private\public\general)
// Description:
// Permissions:   user/friends
// Body:          { postContent, type }
// Response:      { postId }
routes.post('/:id', async (req: Request, res: Response) => {

  const {title, content, type} = req.body as {
    title: string;
    content: string;
    type: string;
  };

  const author = '123';

  try {
    const newPost = new Post({
      title,
      content,
      author: author,
      comments: [],
      type,
    });

    const saved = await newPost.save();

    return res
      .status(ResponseCodes.CREATED)
      .send(saved);
  }
  catch (error) {
    return res
      .status(ResponseCodes.INTERNAL_ERROR)
      .send()
  }
});


// Method:        PATCH
// Summary:       edit user data
// Description:
// Permissions:   user
// Body:          { ...userData }
// Response:      { ...userData }
routes.patch('/:id', userAuthorization, async (req: Request, res: Response) => {

  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  const { id: userId } = req.params as {
    id: string;
  };

  return res.send().status(200);
});

export default routes;
