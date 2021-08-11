require("dotenv-safe").config({
  allowEmptyValues: true,
});
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const restRoutes = require("./rest/routes/v1");
const server = require("./graphql");
const errorHandlers = require("./rest/middlewares/errorHandlers");

const app = express();
server.applyMiddleware({ app });

app.use(express.json());
app.use(cors());
app.get("/health", (req, res) => res.send({ status: "OK" }));
app.get("/ping", (req, res) => res.status(200).send("PONG"));
app.get("/", (req, res) => res.send({ msg: "Country Info Server" }));

// limit quantity of request to auth/login
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
  message:
    "There were too many login request created from this IP, please try again after an 1 minute",
});
app.use("/api/v1/auth/login", apiLimiter);

// add rest routes
app.use("/api/v1", restRoutes);
// error handler, send stacktrace if is not production
app.use(errorHandlers);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`
    🚀... Server ready!
    🚀... Rest URL: https://${HOST}:${PORT}/api/v1
    🚀... Graphql Playground URL: http://${HOST}:${PORT}/graphql
    `);
});
