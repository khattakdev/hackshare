const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    learning_id: {
      type: Schema.Types.ObjectId,
      ref: "Learning",
    },
    expert_id: {
      type: Schema.Types.ObjectId,
      ref: "Expertise",
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    meeting_url: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Inviation Sent",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = meetingSchema;
