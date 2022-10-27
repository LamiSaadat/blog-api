const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.comment = async (req, res) => {
  const { authorId, comment } = req.body;
  const postId = req.params.id;

  const newComment = await prisma.comment.create({
    data: {
      userId: authorId,
      postId,
      comment,
    },
  });
  res.json(newComment);
};
