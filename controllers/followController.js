const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.follow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);

  //find following user
  //if already following user
  //unfollow with update
  //if not following user
  //follow user with create

  try {
    if (followerId === followingId) {
      throw new Error("You can't follow yourself.");
    }

    const newFollow = await prisma.follow.create({
      data: {
        followerId,
        followingId: followingId,
        follow: true,
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
