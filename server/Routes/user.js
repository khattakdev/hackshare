const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router.get("/register", userController.register);

module.exports = router;
