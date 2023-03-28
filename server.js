const express = require("express");
const nodemon = require("nodemon");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const { handleSignin, isLoggedIn } = require("./controllers/authController");
const { handleRegister } = require("./controllers/authController");
const errorController = require("./controllers/errorController");

dotenv.config();
const db = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(db)
  .then(console.log("db connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.get("/", isLoggedIn, (req, res) => {
  if (req.user) {
    res.json({
      status: "success",
      user: req.user,
    });
  }
  res.send("success");
});

app.post("/api/signin", handleSignin);

app.post("/api/register", handleRegister);

app.get("/api/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/api/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/api/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.use(errorController);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is working on port ${port}`);
});
