const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const app = express();
const carsController = require("./controllers/carsController");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome To the Car APP!");
});

app.use("/cars", carsController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});

module.exports = app;
