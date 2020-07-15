const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const endorsementSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expert_id: {
      type: Schema.Types.ObjectId,
      ref: "Expert",
      required: true,
    },
    meeting_id: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("endorsement", endorsementSchema);
