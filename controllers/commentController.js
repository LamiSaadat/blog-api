const { CommentClass } = require("../services/prismaService");
const { validatePostID } = require("../utils/helpers");

exports.comment = async (req, res) => {
  const authorId = req.decoded.userId;
  const { comment } = req.body;
  const postId = req.params.id;

  if (validatePostID(postId)) {
    return res.status(400).send({
      error: "Invalid post ID"
    })
  }

  if (typeof comment !== "string" || comment.trim().length === 0) {
    return res.status(400).send({
      error: "Invalid input data",
    });
  }

  try {
    const newComment = await CommentClass.createComment(authorId, postId, comment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
