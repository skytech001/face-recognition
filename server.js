const express = require("express");
const nodemon = require("nodemon");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const signin = require("./controllers/signin");
const register = require("./controllers/register");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

dotenv.config();
const db = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(db)
  .then(console.log("db connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/api/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/api/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/api/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/api/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is working on port ${port}`);
});
