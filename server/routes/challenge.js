const express = require("express");
const challengeController = require("../controller/challenge");
const router = express.Router();

router.post("/add", challengeController.addChallenge);
router.put("/update", challengeController.updateChallenge);
router.delete("/remove", challengeController.removeChallenge);
router.get("/:expertise_id", challengeController.getExpertiseChallenges);

module.exports = router;
