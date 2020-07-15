const express = require("express");
const userController = require("../controller/learning");
const router = express.Router();

router.get("/register", userController.addLearning);
router.get("/remove", userController.removeLearning);
router.get("/update", userController.updateLearning);
router.get("/:user_id", userController.getUserLearnings);

module.exports = router;
