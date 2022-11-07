const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const commentController = require("../controllers/commentController");
const likeController = require("../controllers/likeController");
const { authorize } = require("../utils/authMiddleware");

router.route("/feed").get(postController.getAllPosts);

router.route("/create").post(authorize, postController.createPosts);

router.route("/drafts").get(authorize, postController.drafts);

router
  .route("/:id")
  .delete(authorize, postController.deletePost)
  .patch(authorize, postController.editPost);

router.route("/:id/comment").post(authorize, commentController.comment);

router.route("/:id/like").post(authorize, likeController.like);
router.route("/:id/unlike").post(authorize, likeController.unlike);

module.exports = router;
