const express = require("express");
const { login, signup } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/signup", signup);

module.exports = userRouter;
