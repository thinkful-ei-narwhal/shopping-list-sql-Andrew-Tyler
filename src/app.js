require("dotenv");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const { NODE_ENV } = require("./config");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(cors());
app.use(helmet());
app.use(morgan(morganOption));

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.use(function errorMiddleWare(err, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "Server error" } };
  } else {
    console.log(err);
    response = { error: err, message: err.message };
  }
  res.status(500).json({ error: err.message });
  next();
});

module.exports = app;
