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
    time_zone: {
      type: String,
    },
    country_code: {
      type: String,
    },
    expert_meeting: {
      type: Number,
      required: true,
      default: 0,
    },
    learner_meeting: {
      type: Number,
      required: true,
      default: 0,
    },
    challeneges_added: {
      type: Number,
      required: true,
      default: 0,
    },
    challenges_complete: {
      type: Number,
      required: true,
      default: 0,
    },
    auth0_ref: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
