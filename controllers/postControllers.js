const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllPosts = async (_req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
          },
        },
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

exports.getSinglePost = async (req, res) => {
  const postId = Number(req.params.id);

  try {
    const postData = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
          },
        },
        comments: true,
        likes: true,
      },
    });
    res.json(postData);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

exports.createPosts = async (req, res) => {
  const { title, content, published } = req.body;
  const { userId } = req.decoded;

  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: userId,
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
  const { userId } = req.decoded;
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
  const { userId } = req.decoded;

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

exports.drafts = async (req, res) => {
  const { userId } = req.decoded;

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
