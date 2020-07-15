const { challengeDB } = require("../Model/index");
const Joi = require("@hapi/joi");

exports.getAllChallenges = async (req, res) => {
  const expertise_id = req.params.expertise_id;

  try {
    let challenges = await challengeDB.find({ expertise_id: expertise_id });
    res.status(200).json({
      msg: challenges,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};
exports.addChallenge = async (req, res) => {
  const { sub } = req.user;
  const {
    topic,
    expertise,
    difficulty,
    description,
    repo_url,
    assets,
    cover_photo,
  } = req.body;

  const schema = Joi.object().keys({
    topic: Joi.string().required(),
    expertise: Joi.string().required(),
    difficulty: Joi.number().min(1).max(3).required(),
    description: Joi.string().required(),
    repo_url: Joi.string(),
    assets: Joi.string(),
    cover_photo: Joi.string(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      topic,
      expertise,
      difficulty,
      description,
      repo_url,
      assets,
      cover_photo,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    // Find an Expertise wuth topic [expertise] and auth0_ref [sub]
    const expertise = expertise.findOne({ topic: expertise, authO_ref: sub });
    if (!expertise) {
      return res.status(402).json({
        msg: "Expertise not Found!",
      });
    }
    let newChallenge = new challengeDB({
      expertise_id: expertise._id,
      topic,
      difficulty,
      description,
      repo_url,
      assets,
      cover_photo,
    });
    await newChallenge.save();

    return res.status(200).json({
      msg: "Challenge Added",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.updateChallenge = async (req, res) => {
  const {
    challenge_id,
    topic,
    difficulty,
    description,
    repo_url,
    assets,
    cover_photo,
  } = req.body;

  const schema = Joi.object().keys({
    challenge_id: Joi.string().required(),
    topic: Joi.string().required(),
    expertise: Joi.string().required(),
    difficulty: Joi.number().min(1).max(3).required(),
    description: Joi.string().required(),
    repo_url: Joi.string(),
    assets: Joi.string(),
    cover_photo: Joi.string(),
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
    let challenge = challengeDB.findById(challenge_id);

    if (!challenge) {
      return res.status(402).json({
        msg: "Challenge not Found!",
      });
    }

    challenge = {
      ...challenge,
      topic,
      difficulty,
      description,
      repo_url,
      assets,
      cover_photo,
    };
    await challenge.save();

    return res.status(200).json({
      msg: "Challenge Updated",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};

exports.removeChallenge = async (req, res) => {
  const { challenge_id } = req.body;

  const schema = Joi.object().keys({
    challenge_id: Joi.string().required(),
  });

  // Schema Validation
  try {
    await schema.validateAsync({
      challenge_id,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  try {
    let challenge = learningDB.findById(challenge_id);

    if (!challenge) {
      return res.status(402).json({
        msg: "Language/Skill not Found!",
      });
    }

    await challenge.remove();

    return res.status(200).json({
      msg: "Challenge Removed",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server Error!",
    });
  }
};
