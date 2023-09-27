const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.comment = async (req, res) => {
  const authorId = req.decoded.userId;
  const { comment } = req.body;
  const postId = req.params.id;

  if (!authorId || isNaN(authorId) || authorId <= 0 || isNaN(postId) || postId <= 0 || typeof comment !== "string" || comment.trim().length === 0) {
    return res.status(400).send({
      error: "Invalid input data",
    });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        userId: authorId,
        postId: Number(postId),
        content: comment,
      },
    });

    res.json(newComment);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
