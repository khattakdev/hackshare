const express = require("express");
const userController = require("../Controller/user");
const router = express.Router();

router.get("/register", userController.register);

module.exports = router;
