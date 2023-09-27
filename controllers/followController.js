const { PrismaClient } = require("@prisma/client");
const { validateUserID } = require("../utils/helpers") 

const prisma = new PrismaClient();

exports.follow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);
  validateUserID(followerId)
  validateUserID(followingId)

  try {
    if (followerId === followingId) {
      return res.status(400).send({
        error: "You can't follow yourself",
      });
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
    res.status(201).json(newFollow);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.unfollow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);
  validateUserID(followerId)
  validateUserID(followingId)

  try {
    if (followerId === followingId) {
      return res.status(400).send({
        error: "You can't unfollow yourself",
      });
    }
    const unfollow = await prisma.follow.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    res.status(200).json(unfollow);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.allFollowers = async (req, res) => {
  const userId = Number(req.params.id);
  validateUserID(followerId)
  validateUserID(followingId)

  try {
    const followers = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followedBy: true,
      },
    });

    if (!followers) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    res.status(200).json(followers);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
