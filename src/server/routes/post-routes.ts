import {Request, Response, Router} from "express";
import { isNil } from "lodash";
import {ResponseCodes} from "../util/response-codes";
import {Post, User, Comment} from "../models";
import {userAuthorization} from "../util/auth-utils";

// COMMON PATH - /post/:postId

const routes = Router({mergeParams: true});

// Method:        POST
// Summary:       post comment
// Description:   check permissions, if successful notify everyone seeing board
// Permissions:   public - anyone logged / private - user or friends
// Body:          { commentContent, ? commentKey ? }
// Response:      { wall }
routes.post('/', userAuthorization, async (req: Request, res: Response) => {

  const postId = req.params.postId;
  const userId = req.body.userId;
  const content = req.body.content;

  if (isNil(postId) || isNil(userId) || isNil(content)) {
    return res.sendStatus(ResponseCodes.WRONG_BODY_CONTENT);
  }

  try {
    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (isNil(user) || isNil(post)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    const postAuthor = await User.findById(post.author);

    if (isNil(postAuthor)) {
      return res.sendStatus(ResponseCodes.NOT_FOUND);
    }

    const comment = new Comment({
      content,
      author: user._id,
      post: post._id,
    })

    await comment.save();

    const comments = await Comment.find({post: post._id}).populate('author');

    const io = req.app.get('socketio');


    io.emit(`wall/${postAuthor.username}/${post.type}`, {
      id: post._id,
      title: post.title,
      content: post.content,
      author: postAuthor.username,
      comments: comments.map((comment) => ({
        id: comment._id,
        content: comment.content,
        // @ts-ignore
        author: comment.author.username,
      })),
    })

    return res.status(ResponseCodes.OK).send({
      content: comment.content,
      author: user.username,
    });

  }
  catch (error) {
    return res.sendStatus(ResponseCodes.INTERNAL_ERROR);
  }
});

export default routes;
