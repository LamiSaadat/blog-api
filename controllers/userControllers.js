const { PrismaClient } = require("@prisma/client");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, sendAccessToken } = require("../utils/token");

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (user) throw new Error("User already exists.");

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new Error("User does not exist.");

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) throw new Error("Incorrect password.");

    const accessToken = createAccessToken(user.id)
    sendAccessToken(res, req, accessToken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

exports.profile = async (req, res) => {
  const userId = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        email: true,
        posts: true,
        followedBy: true,
        following: true,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

exports.userAccount = async (req, res) => {
  const { userId } = req.decoded;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        email: true,
        password: true,
        posts: true,
        followedBy: true,
        following: true,
        Like: true,
        Comment: true,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
