const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");
const connectDB = async (listen) => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
    });
    console.log("Connected To Database");
    listen();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
