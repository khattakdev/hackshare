const express = require("express");
const expertiseController = require("../controller/expertise");
const router = express.Router();

router.post("/add", expertiseController.addExpertise);
router.post("/remove", expertiseController.removeExpertise);
router.post("/update", expertiseController.updateExpertise);
router.get("/:user_id", expertiseController.getAllExpertise);

module.exports = router;
