const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });

  if (!email || !password) throw Error("All field must be filled");

  if (!validator.isEmail(email)) throw Error("Email is not valid");

  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  if (exists) {
    throw Error("Email already in use");
  }
  password = await bcrypt.hash(password, process.env.SALT);

  const user = await this.create({ email, password });

  return user;
};

module.exports = mongoose.model("User", userSchema);
