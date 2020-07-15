const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expertiseSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    auth0_ref: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("expertise", expertiseSchema);
