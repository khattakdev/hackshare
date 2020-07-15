const { learningDB, userDB } = require("../model");
const Joi = require("@hapi/joi");

exports.addLearning = async (req, res) => {
  const { nickname } = req.user;
  const { topic } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      level,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const user = userDB.findOne({ authO_ref: nickname });
    if (!user) {
      return res.status(402).json({
        msg: "User not Found!",
      });
    }
    const newLearning = new learningDB({
      user_id,
      topic,
    });
    await newLearning.save();

    return res.status(200).json({
      msg: "Language/Skill Added",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.updateLearning = async (req, res) => {
  const { nickname } = req.user;
  const { topic } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const user = userDB.findOne({ authO_ref: nickname });
    const learning = learningDB.findOne({ topic, user_id: user._id });

    if (!learning) {
      return res.status(402).json({
        msg: "Language/Skill not Found!",
      });
    }

    learning = {
      ...learning,
      topic,
    };
    await learning.save();

    return res.status(200).json({
      msg: "Language/Skill Updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.removeLearning = async (req, res) => {
  const { nickname } = req.user;
  const { topic } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const user = userDB.findOne({ authO_ref: nickname });
    const learning = learningDB.findOne({ topic, user_id: user._id });

    if (!learning) {
      return res.status(402).json({
        msg: "Language/Skill not Found!",
      });
    }

    await learning.remove();

    return res.status(200).json({
      msg: "Language/Skill Updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};
