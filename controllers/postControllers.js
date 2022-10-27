const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllPosts = async (req, res) => {
  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: { author: true, comments: true },
  });
  res.json(allPosts);
};

exports.createPosts = async (req, res) => {
  const { title, content, authorEmail, published } = req.body;

  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
      published,
    },
  });
  res.json(result);
};

exports.editPost = async (req, res) => {
  const userId = req.decoded.userId;
  const { title, content } = req.body;

  const postData = await prisma.post.findUnique({
    where: { id: userId },
  });

  const updatedPost = await prisma.post.update({
    where: { id: userId },
    data: {
      title,
      content,
      published: !postData.published,
    },
  });

  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const userId = req.decoded.userId;

  const result = await prisma.post.delete({
    where: { id: userId },
    include: {
      author: true,
    },
  });

  res.json(result);
};

//drafts
exports.getUnpublishedPosts = async (req, res) => {
  const userId = req.decoded.userId;

  const unpubPosts = await prisma.post.findMany({
    where: {
      authorId: userId,
      published: false,
    },
    include: { author: true },
  });
  res.json(unpubPosts);
};
