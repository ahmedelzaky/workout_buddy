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

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All field must be filled");

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
