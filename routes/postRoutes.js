const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
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

module.exports = router;
