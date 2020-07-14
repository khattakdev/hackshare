const express = require("express");
require("dotenv").config();
const userRoute = require("./Routes/user");
const connectDB = require("./Helper/db");
const app = express();

app.use("/user", userRoute);
app.get("/", function (req, res) {
  res.send("Hello World");
});

connectDB(() => {
  app.listen(8080);
});
