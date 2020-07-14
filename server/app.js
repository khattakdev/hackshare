const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/user");
const connectDB = require("./helper/db");
const app = express();

app.use("/user", userRoute);
app.get("/", function (req, res) {
  res.send("Hello World");
});

connectDB(() => {
  app.listen(8080);
});
