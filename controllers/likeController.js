const { LikeClass } = require("../services/prismaService")
const { validateUserID, validateFields } = require("../utils/helpers")

exports.like = async (req, res) => {
  const { userId } = req.decoded;
  const { like } = req.body;
  const postId = Number(req.params.id);

  validateUserID(userId)
  if(!validateFields(like)) {
    return res.status(400).send({
      error: "Invalid request data",
    });
  }

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

  validateUserID(userId)

  try {
    const unlike = await LikeClass.removeLike(userId, postId)
    res.status(200).json(unlike);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
