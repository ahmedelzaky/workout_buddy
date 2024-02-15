const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.signup(email, password);

    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  login,
  signup,
};
