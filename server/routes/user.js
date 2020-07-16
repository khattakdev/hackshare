const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router
  .post("/register", userController.register)
  .put("/edit", userController.edit)
  .get("/whoami", userController.whoami)
  .get("/:userId", userController.user);
router
  .post("/freeSlot", userController.freeSlots)
  .get("/freeSlot/:userId", userController.getFreeSlots);

router.get("/expert", userController.expert);
router.get("/learner", userController.learner);

module.exports = router;
