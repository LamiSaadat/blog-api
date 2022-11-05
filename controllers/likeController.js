const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//LIKE A POST
//CREATE LIKE FOR A POST
exports.like = async (req, res) => {
  const { userId } = req.decoded;
  const { like } = req.body;
  const postId = Number(req.params.id);

  try {
    const like = await prisma.like.create({
      data: {
        userId,
        postId,
        like,
      },
    });

    res.json(like);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

//UNLIKE A POST
//DELETE THE RELATIONSHIP FROM THE TABLE
exports.unlike = async (req, res) => {
  const { userId } = req.decoded;
  const postId = Number(req.params.id);

  try {
    const unlike = await prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    res.json(unlike);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
