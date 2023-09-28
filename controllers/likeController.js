const { LikeClass } = require("../services/prismaService")

exports.like = async (req, res) => {
  const { userId } = req.decoded;
  const { like } = req.body;
  const postId = Number(req.params.id);

  try {
    const likeCreated = await LikeClass.createLike(userId, postId, like)
    res.status(201).json(likeCreated);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.unlike = async (req, res) => {
  const { userId } = req.decoded;
  const postId = Number(req.params.id);

  try {
    const unlike = await LikeClass.removeLike(userId, postId)
    res.status(200).json(unlike);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
