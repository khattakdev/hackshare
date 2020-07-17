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
  const { topic, level } = req.body;

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
    let newLearning = [];

    for (let i = 0; i < topic.length; i++) {
      newLearning.push(
        new learningDB({
          user_id: user._id,
          name: user.name,
          topic: topic[i],
          auth0Ref: sub,
        })
      );
    }
    await learningDB.insertMany(newLearning);

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
  const { topic, level, learning_id } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
    level: Joi.number().min(1).max(3).required(),
    learning_id: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      level,
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
          level,
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
  const { learning_id } = req.body;

  const schema = Joi.object().keys({
    learning_id: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      learning_id,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const learning = await learningDB.findOneAndDelete({
      _id: learning_id,
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
