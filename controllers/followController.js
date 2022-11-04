const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//FOLLOW A USER
//CREATING A CONNECTION BETWEEN THE FOLLOWER AND THE USER BEING FOLLOWED IN THE RELATION TABLE
exports.follow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);

  try {
    if (followerId === followingId) {
      throw new Error("You can't follow yourself.");
    }

    const newFollow = await prisma.user.update({
      where: {
        id: followerId,
      },
      data: {
        following: {
          create: [
            {
              following: {
                connect: {
                  id: followingId,
                },
              },
            },
          ],
        },
      },
    });

    res.json(newFollow);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

//UNFOLLOW A USER
//DELETE THE RELATIONSHIP FROM THE RELATION TABLE
exports.unfollow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);

  try {
    const unfollow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    res.json(unfollow);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
