const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    timeZone: {
      type: String,
    },
    countrCcode: {
      type: String,
    },
    expertMeeting: {
      type: Number,
      required: true,
      default: 0,
    },
    learnerMeeting: {
      type: Number,
      required: true,
      default: 0,
    },
    challenegesAdded: {
      type: Number,
      required: true,
      default: 0,
    },
    challengesComplete: {
      type: Number,
      required: true,
      default: 0,
    },
    auth0Ref: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
