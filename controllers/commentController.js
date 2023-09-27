const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.comment = async (req, res) => {
  const authorId = req.decoded.userId;
  const { comment } = req.body;
  const postId = req.params.id;

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
    res.send({
      error: `${err.message}`,
    });
  }
};
