const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllPosts = async (req, res) => {
  const allPosts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: { author: true },
  });
  res.json(allPosts);
};

exports.getUnpublishedPosts = async (req, res) => {
  const unpubPosts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  });
  res.json(unpubPosts);
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
  const { id } = req.params;
  const { title, content } = req.body;

  const postData = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      title,
      content,
      published: !postData.published,
    },
  });

  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.delete({
    where: { id: Number(id) },
  });

  res.json(result);
};
