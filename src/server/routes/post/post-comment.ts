import {Request, Response} from "express";
import {isNil} from "lodash";
import {ResponseCodes} from "../../types/response-codes";
import {Comment, Post, User} from "../../models";

export const postCommentHandler = async (req: Request, res: Response) => {

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
}
