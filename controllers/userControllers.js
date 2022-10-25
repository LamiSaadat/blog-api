const { PrismaClient } = require("@prisma/client");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, sendAccessToken } = require("../utils/token");

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

//login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    //check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    console.log(user);
    //throw error if user does not exist
    if (!user) throw new Error("User does not exist.");

    //if user exists
    //compare passwords
    const checkPassword = await compare(password, user.password);

    //throw error if password is incorrect
    if (!checkPassword) throw new Error("Incorrect password.");

    //if password is correct, create access token
    const accessToken = createAccessToken(user.id);

    //send token
    sendAccessToken(res, req, accessToken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
