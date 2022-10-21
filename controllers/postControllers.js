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

exports.createPosts = async (req, res) => {
  const { title, content, authorEmail } = req.body;

  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  });
  res.json(result);
};
