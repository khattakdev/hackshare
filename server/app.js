require("dotenv").config();
const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const userRoute = require("./routes/user");
const connectDB = require("./helper/db");
const app = express();


app.use("/user", userRoute);

app.use(
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    algorithms: ["RS256"],
  })
);
app.get("/", function (req, res) {
  res.send("Hello World");
});

connectDB(() => {
  app.listen(8080);
});
