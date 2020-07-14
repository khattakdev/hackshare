const express = require("./node_modules/express");
const userController = require("../controller/user");
const router = express.Router();

router.get("/register", userController.register);

module.exports = router;
