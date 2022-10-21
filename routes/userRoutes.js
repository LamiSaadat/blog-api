const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.route("/").post(userController.createUser);

module.exports = router;
