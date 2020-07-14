require("dotenv").config();
const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const routes = require("./routes");
const connectDB = require("./helper/db");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.use("/user", routes.user);
app.use("/expertise", routes.expertise);

connectDB(() => {
  app.listen(8080);
});
