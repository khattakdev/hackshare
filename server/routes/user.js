const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router
  .route("/")
  .post(userController.register)
  .put(userController.edit)
  .get(userController.whoami);
router
  .post("/freeSlot", userController.freeSlots)
  .get("/freeSlot/:userId", userController.getFreeSlots);

module.exports = router;
