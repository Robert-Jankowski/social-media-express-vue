export const getUpdatedPosts = (posts, message) => {
  const result = [];

  posts.forEach((post) => {

    const idMatches = post.id === message.id;

    if (idMatches) {
      result.push(message);
      return;
    }
    const copy = {
      ...post,
      comments: [
        ...post.comments.map((comment) => ({
          id: comment.id,
          author: comment.author,
          content: comment.content,
        }))
      ]
    }

    result.push(copy)
  })

  return result;
}
