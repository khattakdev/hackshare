const express = require("express");
const userRoute = require("./Routes/user");
const connectDB = require("./Config/db");
const app = express();

app.use("/user", userRoute);
app.get("/", function (req, res) {
  res.send("Hello World");
});

connectDB(() => {
  app.listen(8080);
});
