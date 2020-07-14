require("dotenv").config();
const express = require("express");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const routes = require("./routes");
const connectDB = require("./helper/db");
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

app.use("/user", routes.user);
app.use("/expertise", routes.expertise);
app.get("/", function (req, res) {
  res.send("Hello World");
});

connectDB(() => {
  app.listen(8080);
});

// eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlM0ckpESUpPQ2FkWGF1d3duMGdEVyJ9.eyJuaWNrbmFtZSI6ImFuc2h1bHJnb3lhbCIsIm5hbWUiOiJBbnNodWwgR295YWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9hdmF0YXJzMi5naXRodWJ1c2VyY29udGVudC5jb20vdS8zMjA2ODA3NT92PTQiLCJ1cGRhdGVkX2F0IjoiMjAyMC0wNy0xNFQwODoyMDoxMS41NThaIiwiaXNzIjoiaHR0cHM6Ly9jcm9zcy1wb2RzLmF1LmF1dGgwLmNvbS8iLCJzdWIiOiJnaXRodWJ8MzIwNjgwNzUiLCJhdWQiOiJYUHMzZmpvTWp5dFBYSUJHcDRDaEdXRFV0dmRFbWZKbCIsImlhdCI6MTU5NDcxNDgxMywiZXhwIjoxNTk0NzUwODEzLCJub25jZSI6IlVGaEZkVEpaYzNOMU5
