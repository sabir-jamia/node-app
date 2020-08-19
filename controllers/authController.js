const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");

const createToken = user => {
  return jwt.sign({ user }, config.jwt.secret, config.jwt.options);
};

const signupGet = (req, res) => {
  res.render("signup");
};

const signupPost = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("/signin");
  } catch (e) {
    res.json({ error: String(e) });
  }
};

const signinGet = (req, res) => {
  res.render("signin");
};

const signinPost = async (req, res) => {
  try {
    const user = req.user;
    const token = createToken(user);
    res.cookie("jwt", token, config.jwt.cookie);
    res.redirect("/openings");
  } catch (e) {
    res.json({ error: String(e) });
  }
};

const resumeUpload = async (req, res) => {
  try {
    const _id = req.user.id;
    await User.update({ _id }, { resume: req.file.filename }).exec();
    res.redirect("/openings");
  } catch (e) {
    res.json({ error: String(e) });
  }
};

module.exports = { signupGet, signupPost, signinGet, signinPost, resumeUpload };
