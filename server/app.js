require("dotenv").config();
const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const userRoute = require("./Routes/user");
const connectDB = require("./Helper/db");
const app = express();

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

app.use(require("body-parser").json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use("/user", userRoute);

app.use(function (err, req, res, next) {
  res.status(500).json({ err: err.message || err });
});

connectDB(() => {
  app.listen(8080);
});
