const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const verifytoken = async (req, res, next) => {
  let token;
  if (
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")) ||
    (req.headers.Authorization &&
      req.headers.Authorization.startsWith("Bearer"))
  ) {
    token =
      req.headers.authorization.split(" ")[1] ||
      req.headers.Authorization.split(" ")[1];
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
      req.user = await userModel.findById(_id).exec();
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: error.message });
    }
  } else {
    res
      .status(401)
      .json({ success: false, message: "Authorization token required" });
  }
};

module.exports = verifytoken;
