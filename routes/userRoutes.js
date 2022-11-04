const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const followController = require("../controllers/followController");
const { authorize } = require("../utils/authMiddleware");

router.route("/").post(userController.createUser);

router.route("/login").post(userController.loginUser);

router.route("/profile").get(authorize, userController.profile);

router.route("/:id/follow").post(authorize, followController.follow);
router.route("/:id/unfollow").post(authorize, followController.unfollow);

module.exports = router;
