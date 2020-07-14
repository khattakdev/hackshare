const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema(
  {
    expertise_id: {
      type: Schema.Types.ObjectId,
      ref: "Expertise",
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    repo_url: {
      type: String,
    },
    assets: {
      type: String,
    },
    cover_photo: {
      type: String,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("challenge", challengeSchema);
