const UserModel = require("../models/user.model");

const login = async (req, res) => {
  const { email, password } = req.body;
};
const signup = async (req, res) => {};

module.exports = {
  login,
  signup,
};
