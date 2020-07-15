const express = require("express");
const challengeController = require("../controller/challenge");
const router = express.Router();

router.post("/register", challengeController.addChallenge);
router.post("/update", challengeController.updateChallenge);
router.post("/remove", challengeController.removeChallenge);
router.get("/:expertise_id", challengeController.getAllChallenges);

module.exports = router;
