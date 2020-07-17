const express = require("express");
const expertiseController = require("../controller/expertise");
const router = express.Router();

router.post("/add", expertiseController.addExpertise);
router.delete("/remove/:id", expertiseController.removeExpertise);
router.put("/update", expertiseController.updateExpertise);
router.get("/:user_id", expertiseController.getUserExpertise);
router.get("/", expertiseController.getAllExpertise);

module.exports = router;
