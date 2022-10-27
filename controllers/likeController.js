const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addLike = async (req, res) => {
  const authorId = req.decoded.userId;
  const { like } = req.body;
  const postId = req.params.id;

  const newLike = await prisma.like.create({
    data: {
      userId: authorId,
      postId: Number(postId),
      like,
    },
  });
  res.json(newLike);
};
