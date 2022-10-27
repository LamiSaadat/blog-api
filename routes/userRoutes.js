const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const { authorize } = require("../utils/authMiddleware");

router.route("/").post(userController.createUser);

router.route("/login").post(userController.loginUser);

router.route("/profile").get(authorize, userController.profile);

module.exports = router;
