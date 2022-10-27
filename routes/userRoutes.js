const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { authorize } = require("../utils/authMiddleware");

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

router.route("/login").post(userController.loginUser);

router.route("/profile").get(authorize, userController.profile);

router.route("/:id").get(userController.getUser);

module.exports = router;
