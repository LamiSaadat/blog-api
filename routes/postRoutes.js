const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const commentController = require("../controllers/commentController");
const likeController = require("../controllers/likeController");
const { authorize } = require("../utils/authMiddleware");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPosts);

router.route("/drafts").get(authorize, postController.getUnpublishedPosts);

router
  .route("/:id")
  .delete(authorize, postController.deletePost)
  .patch(authorize, postController.editPost);

router.route("/:id/comment").post(authorize, commentController.comment);

router.route("/:id/like").post(authorize, likeController.like);
router.route("/:id/unlike").post(authorize, likeController.unlike);

module.exports = router;
