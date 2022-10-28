const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.follow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);

  try {
    if (followerId === followingId) {
      throw new Error("You can't follow yourself.");
    }

    const newFollow = await prisma.follow.create({
      data: {
        followerId,
        followingId: followingId,
      },
      select: {
        follower: true,
        following: true,
      },
    });

    res.json(newFollow);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
