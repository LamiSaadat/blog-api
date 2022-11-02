const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addLike = async (req, res) => {
  const likerId = req.decoded.userId;
  const { like } = req.body;
  const postId = Number(req.params.id);

  try {
    //find post data from post table and return likes array
    const postData = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        likes: true,
      },
    });
    console.log(postData.likes);

    //remove like if user has already liked the post
    // const toggleLike = await prisma.like.delete({
    //   where: { postId: postId, userId: likerId },
    // });

    //create a new like for a post that this user has not liked yet
    const newLike = await prisma.like.create({
      data: {
        userId: likerId,
        postId: postId,
        like,
      },
    });

    // postData.likes.forEach((obj) =>
    //   obj.postId === postId && obj.userId === likerId
    //     ? res.json(toggleLike)
    //     : res.json(newLike)
    // );

    res.json(newLike);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
