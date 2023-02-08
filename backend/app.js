const express = require("express");
const morgan = require("morgan");
const router = require("./api");
const app = express();
const cors = require("cors");
const client = require("./db/client");
const path = require("path");
client.connect();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));
app.use("/api", router);
app.use((req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
  } catch (error) {
    next(error);
  }
});

app.get("*", (req, res, next) => {
  res.status(404).send({
    error: "404 - NOT FOUND",
    message: "No route found for the requested URL",
  });
});

app.use((error, req, res, next) => {
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = app;
