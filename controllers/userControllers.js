const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// exports.getAllUsers = async (req, res) => {
//   const allPosts = await prisma.user.findMany({
//     where: {
//       published: true,
//     },
//     include: { author: true },
//   });
//   res.json(allPosts);
// };

exports.createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const result = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
    },
  });
  res.json(result);
};
