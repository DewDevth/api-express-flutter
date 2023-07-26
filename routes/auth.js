const bcryptjs = require("bcryptjs");
const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.get("/", async (req, res) => {
  res.send("This is my API running...");
});
//register
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with same email already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//login
authRouter.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMacth = await bcryptjs.compare(password, user.password);
    if (!isMacth) {
      return res.status(400).json({ msg: "Incorrect password." });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

authRouter.get("/api/users", async (req, res) => {
  try {
    const user = await User.find();
    console.log("route users");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
