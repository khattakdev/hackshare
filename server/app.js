const express = require("express");
const userRoute = require("./Routes/user");
const app = express();

app.use("/user", userRoute);
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8080);
