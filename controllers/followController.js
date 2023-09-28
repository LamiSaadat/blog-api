const { validateUserID } = require("../utils/helpers") 
const { FollowClass } = require("../services/prismaService")

exports.follow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);
  validateUserID(followerId)
  validateUserID(followingId)

  try {
    if (followerId === followingId) {
      return res.status(400).send({
        error: "You can't follow yourself",
      });
    }
    const newFollow = await FollowClass.createNewFollower(followerId, followingId)
    res.status(201).json(newFollow);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.unfollow = async (req, res) => {
  const followerId = req.decoded.userId;
  const followingId = Number(req.params.id);
  validateUserID(followerId)
  validateUserID(followingId)

  try {
    if (followerId === followingId) {
      return res.status(400).send({
        error: "You can't unfollow yourself",
      });
    }
    const unfollow = await FollowClass.unfollow(followerId, followingId)
    res.status(200).json(unfollow);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};

exports.allFollowers = async (req, res) => {
  const userId = Number(req.params.id);
  validateUserID(userId)

  try {
    const followers = await FollowClass.getAllFollowers(userId)

    if (!followers) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    res.status(200).json(followers);
  } catch (err) {
    res.status(500).send({
      error: `${err.message}`,
    });
  }
};
