const express = require("express");
const userController = require("../controller/learning");
const router = express.Router();

router.post("/add", userController.addLearning);
router.delete("/remove", userController.removeLearning);
router.put("/update", userController.updateLearning);
router.get("/:user_id", userController.getUserLearnings);
router.get("/", userController.getAllLearnings);

module.exports = router;
