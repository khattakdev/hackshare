const { expertiseDB, userDB } = require("../model");
const Joi = require("@hapi/joi");

exports.getUserExpertise = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    let expertise = await expertiseDB.find({ user_id: user_id });
    res.status(200).json({
      msg: expertise,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.addExpertise = async (req, res) => {
  const { sub } = req.user;
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
    const user = await userDB.findOne({ auth0_ref: sub });
    if (!user) {
      return res.status(404).json({
        msg: "User not Found!",
      });
    }
    const newExpertise = new expertiseDB({
      user_id: user._id,
      topic,
      level,
      auth0_ref: sub,
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
  const { sub } = req.user;
  const { topic, level, expertise_id } = req.body;

  const schema = Joi.object().keys({
    // topic is Require and must be String
    topic: Joi.string().required(),
    level: Joi.number().min(1).max(3).required(),
    expertise_id: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      level,
      expertise_id,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    let expertise = await expertiseDB.findOne({
      _id: expertise_id,
      auth0_ref: sub,
    });

    if (!expertise) {
      return res.status(404).json({
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
  const { sub } = req.user;
  const { topic, expertise_id } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
    expertise_id: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      expertise_id,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    const expertise = expertiseDB.findOne({
      _id: expertise_id,
      auth0_ref: sub,
    });

    if (!expertise) {
      return res.status(404).json({
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
