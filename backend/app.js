require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./api");
const app = express();
const cors = require("cors");
const client = require("./db/client");
client.connect();

// Setup your Middleware and API Router here
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);
app.use((req, res, next) => {
  // console.log("<____Body Logger START____>");
  // console.log(req.body);
  // console.log("<_____Body Logger END_____>");

  next();
});

app.use((error, req, res, next) => {
  // console.error("SERVER ERROR");
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

app.get("*", (req, res, next) => {
  res.status(404).send({
    error: "404 - NOT FOUND",
    message: "No route found for the requested URL",
  });
});
module.exports = app;
