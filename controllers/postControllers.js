const { PrismaClient } = require("@prisma/client");
const { validateUserID } = require("../utils/helpers")

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

    if (!allPosts) {
      return res.status(404).send({
        error: "Posts not found",
      });
    }

    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.getSinglePost = async (req, res) => {
  const postId = Number(req.params.id);

  if (isNaN(postId) || postId <= 0) {
    return res.status(400).send({
      error: "Invalid post ID"
    })
  }

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

    if (!postData) {
      return res.status(404).send({
        error: "Post not found",
      });
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.createPosts = async (req, res) => {
  const { title, content, published } = req.body;
  const { userId } = req.decoded;
  validateUserID(userId)

  if (!title || !content || typeof published !== "boolean") {
    return res.status(400).send({
      error: "Invalid request data",
    });
  }

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
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.editPost = async (req, res) => {
  const { userId } = req.decoded;
  const { title, content } = req.body;
  validateUserID(userId)

  if (!title || !content) {
    return res.status(400).send({
      error: "Invalid request data",
    });
  }

  try {
    const postData = await prisma.post.findUnique({
      where: { id: userId },
    });

    if (!postData) {
      return res.status(404).send({
        error: "Post not found",
      });
    }

    const updatedPost = await prisma.post.update({
      where: { id: userId },
      data: {
        title,
        content,
        published: !postData.published,
      },
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.deletePost = async (req, res) => {
  const { userId } = req.decoded;
  validateUserID(userId)

  try {
    const result = await prisma.post.delete({
      where: { id: userId },
      include: {
        author: true,
      },
    });

    if (!result) {
      return res.status(404).send({
        error: "Post not found",
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.drafts = async (req, res) => {
  const { userId } = req.decoded;
  validateUserID(userId)

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
    res.status(200).json(unpubPosts);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
