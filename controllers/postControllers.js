const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: true,
        comments: true,
        likes: true,
      },
    });

    res.json(allPosts);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

exports.createPosts = async (req, res) => {
  const { title, content, authorEmail, published } = req.body;

  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: authorEmail,
          },
        },
        published,
      },
    });

    res.json(result);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

exports.editPost = async (req, res) => {
  const userId = req.decoded.userId;
  const { title, content } = req.body;

  try {
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
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

exports.deletePost = async (req, res) => {
  const userId = req.decoded.userId;

  try {
    const result = await prisma.post.delete({
      where: { id: userId },
      include: {
        author: true,
      },
    });

    res.json(result);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

//drafts
exports.getUnpublishedPosts = async (req, res) => {
  const userId = req.decoded.userId;

  try {
    const unpubPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
        published: false,
      },
      include: {
        author: true,
      },
    });

    res.json(unpubPosts);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};
