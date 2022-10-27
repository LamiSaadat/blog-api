const { PrismaClient } = require("@prisma/client");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, sendAccessToken } = require("../utils/token");

const prisma = new PrismaClient();

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

// //protected data
exports.profile = async (req, res) => {
  const userId = req.decoded.userId;
  // console.log("user id: ", userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      email: true,
      posts: true,
    },
  });

  res.json(user);
};
