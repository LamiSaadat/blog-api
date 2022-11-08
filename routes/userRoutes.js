const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const followController = require("../controllers/followController");
const { authorize } = require("../utils/authMiddleware");

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.loginUser);

router.route("/account").get(authorize, userController.userAccount);

router.route("/:id/profile").get(userController.profile);

router.route("/:id/follow").post(authorize, followController.follow);
router.route("/:id/unfollow").post(authorize, followController.unfollow);

router.route("/:id/followers").get(followController.allFollowers);

module.exports = router;
