const joi = require("@hapi/joi");
const { user, freeSlot } = require("../Model");
const { differenceInMinutes, addMinutes } = require("date-fns");
const mongoose = require("mongoose");

const registerSchema = joi
  .object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    timeZone: joi.string().required(),
    countryCode: joi.string().required(),
  })
  .required();

exports.register = async (req, res) => {
  try {
    const userData = await registerSchema.validateAsync(req.body);
    if (!(await user.findOne({ auth0Ref: req.user.sub }))) {
      const newUser = new user({ ...userData, auth0Ref: req.user.sub });
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(500).json({ err: "username already eaxists" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

const editSchema = joi
  .object({
    firstName: joi.string(),
    lastName: joi.string(),
    timeZone: joi.string(),
    countryCode: joi.string(),
  })
  .required()
  .or("firstName", "lastName", "timeZone", "countryCode");

exports.edit = async (req, res) => {
  try {
    const userData = await editSchema.validateAsync(req.body);
    if (await user.findOne({ auth0Ref: req.user.sub })) {
      await user.updateOne({ auth0Ref: req.user.sub }, { $set: userData });
      res.status(200).json(userData);
    } else {
      res.status(500).json({ err: "username doesn't eaxists" });
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
    const userData = await user.findOne({ auth0Ref: req.user.sub });
    const newSlots = [];
    for (let i = 0; i < slots; i++) {
      const from = addMinutes(freeSlotsData.from, 15 * i);
      newSlots.push(
        new freeSlot({
          to: addMinutes(from, 15),
          from,
          user_id: userData._id,
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
    const freeSlots = await freeSlot
      .find({
        user_id: mongoose.Types.ObjectId(userId),
      })
      .sort({ from: 1 });
    res.status(200).json(freeSlots);
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};

exports.whoami = async (req, res) => {
  try {
    const userData = await user.findOne({ auth0Ref: req.user.sub });
    res.json(userData);
  } catch (err) {
    res.status(500).json({ err: err.message || err });
  }
};
