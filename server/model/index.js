const mongoose = require("mongoose");

const user = require("./user");
const task = require("./task");
const meeting = require("./meeting");
const learning = require("./learning");
const expertise = require("./expertise");
const endorsement = require("./endorsement");
const challenge = require("./challenge");
const achievement = require("./achievement");
const freeSlot = require("./freeSlot");

module.exports = {
  userDB: mongoose.models.User || mongoose.model("User", user),
  taskDB: mongoose.models.task || mongoose.model("task", task),
  meetingDB: mongoose.models.meeting || mongoose.model("meeting", meeting),
  learningDB: mongoose.models.learning || mongoose.model("learning", learning),
  expertiseDB:
    mongoose.models.expertise || mongoose.model("expertise", expertise),
  endorsementDB:
    mongoose.models.endorsement || mongoose.model("endorsement", endorsement),
  challengeDB:
    mongoose.models.challenge || mongoose.model("challenge", challenge),
  achievementDB:
    mongoose.models.achievement || mongoose.model("achievement", achievement),
  freeSlotDB: mongoose.models.freeSlot || mongoose.model("freeSlot", freeSlot),
};
