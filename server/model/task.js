const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challenge_id: {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "Awaiting Approval",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("task", taskSchema);
