const joi = require("@hapi/joi");
const { userDB, freeSlotDB, expertiseDB, learningDB } = require("../model");
const { differenceInMinutes, addMinutes } = require("date-fns");
const mongoose = require("mongoose");

const registerSchema = joi
  .object({
    email: joi.string().email().required(),
    timeZone: joi.string().required(),
    countryCode: joi.string().required(),
  })
  .required();

exports.register = async (req, res) => {
  try {
    const userData = await registerSchema.validateAsync(req.body);
    if (!(await userDB.findOne({ auth0Ref: req.user.sub }))) {
      const newUser = new userDB({
        ...userData,
        name: req.user.name,
        auth0Ref: req.user.sub,
        picture: req.user.picture,
      });
      await newUser.save();
      res.status(200).json({
        msg: "User Registered",
        responseData: newUser,
      });
    } else {
      res.status(500).json({ err: "username already exists" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

const editSchema = joi
  .object({
    timeZone: joi.string(),
    countryCode: joi.string(),
  })
  .required()
  .or("timeZone", "countryCode");

exports.edit = async (req, res) => {
  try {
    const userData = await editSchema.validateAsync(req.body);
    if (await userDB.findOne({ auth0Ref: req.user.sub })) {
      await userDB.updateOne({ auth0Ref: req.user.sub }, { $set: userData });
      res.status(200).json({
        msg: "User Updated",
        responseData: userData,
      });
    } else {
      res.status(500).json({ err: "username doesn't exists" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

const freeSlotSchema = joi
  .object({
    to: joi.custom((val) => new Date(val)).required(),
    from: joi.custom((val) => new Date(val)).required(),
  })
  .required();

exports.freeSlots = async (req, res) => {
  try {
    const freeSlotsData = await freeSlotSchema.validateAsync(req.body);
    const slots = Math.floor(
      differenceInMinutes(freeSlotsData.to, freeSlotsData.from) / 15
    );
    const userData = await userDB.findOne({ auth0Ref: req.user.sub });
    const newSlots = [];
    for (let i = 0; i < slots; i++) {
      const from = addMinutes(freeSlotsData.from, 15 * i);
      newSlots.push(
        new freeSlotDB({
          to: addMinutes(from, 15),
          from,
          userId: userData._id,
        })
      );
    }
    await freeSlot.insertMany(newSlots);
    res.status(200).json(newSlots);
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

exports.getFreeSlots = async (req, res) => {
  try {
    const {
      params: { userId },
    } = req;
    const freeSlots = await freeSlotDB
      .find({
        userId: mongoose.Types.ObjectId(userId),
      })
      .sort({ from: 1 });
    res.status(200).json(freeSlots);
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

exports.whoami = async (req, res) => {
  try {
    const userData = await userDB.findOne({ auth0Ref: req.user.sub });
    res.json({
      responseData: userData,
    });
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

exports.expert = async (req, res) => {
  try {
    const experts = await expertiseDB.aggregate([
      {
        $group: {
          _id: "$user_id",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "_id",
        },
      },
      {
        $unwind: "$_id",
      },
    ]);
    res.json(experts.map((value) => value._id));
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

exports.learner = async (req, res) => {
  try {
    const learner = await learningDB.aggregate([
      {
        $group: {
          _id: "$user_id",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "_id",
        },
      },
      {
        $unwind: "$_id",
      },
    ]);
    res.json(learner.map((value) => value._id));
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};
