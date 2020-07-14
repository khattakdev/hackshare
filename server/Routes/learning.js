const express = require("express");
const learningController = require("../controller/learning");
const router = express.Router();

router.get("/register", learningController.register);

module.exports = router;
