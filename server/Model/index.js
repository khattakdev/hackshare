const user = require("./user");
const task = require("./task");
const meeting = require("./meeting");
const learning = require("./learning");
const expertise = require("./expertise");
const endorsement = require("./endorsement");
const challenge = require("./challenge");
const achievement = require("./achievement");

module.exports = {
  userDB: user,
  taskDB: task,
  meetingDB: meeting,
  learningDB: learning,
  expertiseDB: expertise,
  endorsementDB: endorsement,
  challengeDB: challenge,
  achievementDB: achievement,
};
