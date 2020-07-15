const express = require("express");
const challengeController = require("../controller/challenge");
const router = express.Router();

router.get("/register", challengeController.addChallenge);

module.exports = router;
