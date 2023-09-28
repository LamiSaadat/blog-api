const { PostClass } = require("../services/prismaService");
const { validateUserID } = require("../utils/helpers")

exports.getAllPosts = async (_req, res) => {
  try {
    const allPosts = await PostClass.getAllPosts()
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
    const postData = await PostClass.getSinglePost(postId)
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
    const result = await PostClass.createPost(userId, title, content, published)
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
    const postData = await PostClass.findUniquePost(userId)
    if (!postData) {
      return res.status(404).send({
        error: "Post not found",
      });
    }

    const updatedPost = await PostClass.editPost(userId, title, content)
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
    const result = await PostClass.deletePost(userId)
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
    const unpubPosts = await PostClass.getDrafts(userId)
    res.status(200).json(unpubPosts);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
