const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");

router
  .route("/")
  .get(postController.getAllPosts)
  .post(postController.createPosts);

router
  .route("/:id")
  .delete(postController.deletePost)
  .patch(postController.editPost);

module.exports = router;
