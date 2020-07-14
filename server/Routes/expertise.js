const express = require("express");
const expertiseController = require("../controller/expertise");
const router = express.Router();

router.get("/add", expertiseController.addExpertise);

module.exports = router;
