const { PrismaClient } = require("@prisma/client");
const { hash, compare } = require("bcryptjs");
const { createAccessToken, sendAccessToken } = require("../utils/token");

const prisma = new PrismaClient();

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).send({
      error: "Missing required fields",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (user) {
      return res.status(409).send({
        error: "User already exists",
      });
    }

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
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      error: "Missing required fields",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(401).send({
        error: "User does not exist",
      });
    }

    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      return res.status(401).send({
        error: "Incorrect password",
      });
    }

    const accessToken = createAccessToken(user.id)
    sendAccessToken(res, req, accessToken);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.profile = async (req, res) => {
  const userId = Number(req.params.id);
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).send({
      error: "Invalid user ID",
    });
  }

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

    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.userAccount = async (req, res) => {
  const { userId } = req.decoded;
  validateUser(userId)

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

    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
