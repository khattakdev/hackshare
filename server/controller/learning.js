const { learningDB, userDB } = require("../model");
const Joi = require("@hapi/joi");

exports.getAllLearnings = async (req, res) => {
  try {
    let learnings = await learningDB.find();
    res.status(200).json({
      msg: learnings,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};
exports.getUserLearnings = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    let learnings = await learningDB.find({ user_id: user_id });
    res.status(200).json({
      msg: learnings,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.addLearning = async (req, res) => {
  const { sub } = req.user;
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
    const user = await userDB.findOne({ auth0Ref: sub });
    if (!user) {
      return res.status(404).json({
        msg: "User not Found!",
      });
    }
    const newLearning = new learningDB({
      user_id: user._id,
      name: user.name,
      topic,
      auth0Ref: sub,
    });
    await newLearning.save();

    return res.status(200).json({
      msg: "Language/Skill Added",
      responseData: newLearning,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.updateLearning = async (req, res) => {
  const { sub } = req.user;
  const { topic, learning_id } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
    learning_id: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      learning_id,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    let learning = await learningDB.findOneAndUpdate(
      {
        _id: learning_id,
        auth0Ref: sub,
      },
      {
        $set: {
          topic,
        },
      },
      {
        new: true,
      }
    );

    if (!learning) {
      return res.status(404).json({
        msg: "Language/Skill not Found!",
      });
    }

    return res.status(200).json({
      msg: "Language/Skill Updated",
      responseData: learning,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.removeLearning = async (req, res) => {
  const { sub } = req.user;
  const { id } = req.params;

  const schema = Joi.object().keys({
    id: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      id,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const learning = await learningDB.findOneAndDelete({
      _id: id,
      auth0Ref: sub,
    });

    if (!learning) {
      return res.status(404).json({
        msg: "Language/Skill not Found!",
      });
    }

    await learning.remove();

    return res.status(200).json({
      msg: "Language/Skill Removed",
      responseData: learning,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};
