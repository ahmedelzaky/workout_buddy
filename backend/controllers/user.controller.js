const userModel = require("../models/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;
};
const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.signup(email, password);

    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  login,
  signup,
};
