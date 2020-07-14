const { expertiseDB, userDB } = require("../Model/index");
const Joi = require("@hapi/joi");

exports.addExpertise = async (req, res) => {
  const { nickname } = req.user;
  const { topic, level } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
    level: Joi.number().min(1).max(3).required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      level,
    });
  } catch (error) {
    console.log(error.message);
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
    const newExpertise = new expertiseDB({
      user_id,
      topic,
      level,
    });
    await newExpertise.save();

    return res.status(200).json({
      msg: "Expertise Added",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.updateExpertise = async (req, res) => {
  const { nickname } = req.user;
  const { topic, level } = req.body;

  const schema = Joi.object().keys({
    // topic is Require and must be String
    topic: Joi.string().required(),
    level: Joi.number().min(1).max(3).required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      level,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const user = userDB.findOne({ authO_ref: nickname });
    const expertise = expertiseDB.findOne({ topic, user_id: user._id });

    if (!expertise) {
      return res.status(402).json({
        msg: "Expertise not Found!",
      });
    }

    expertise = {
      ...expertise,
      topic,
      level,
    };
    await expertise.save();

    return res.status(200).json({
      msg: "Expertise Updated",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.removeExpertise = async (req, res) => {
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
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const user = userDB.findOne({ authO_ref: nickname });
    const expertise = expertiseDB.findOne({ topic, user_id: user._id });

    if (!expertise) {
      return res.status(402).json({
        msg: "Expertise not Found!",
      });
    }

    await expertise.remove();

    return res.status(200).json({
      msg: "Expertise Updated",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};
