const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.follow = async (req, res) => {
  const followerId = req.decoded.userId;
  console.log(followerId);
  const followingId = Number(req.params.id);
  console.log(followingId);

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
