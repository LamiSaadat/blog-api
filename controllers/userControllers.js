const { PrismaClient } = require("@prisma/client");

const { hash, compare } = require("bcryptjs");

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

//register a user
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    //check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    //throw error if user exists
    if (user) throw new Error("User already exists.");

    //if user does not exist, hash the password
    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    res.json(newUser);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
