const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  firstName: {
    type: "string",
    required: [true, "Please add a first name"],
  },

  lastName: {
    type: "string",
    required: [true, "Please add a last name"],
  },

  username: {
    type: "string",
    required: [true, "Please add a username"],
    unique: true,
    minLength: 6,
  },

  password: {
    type: "string",
    required: [true, "Please add a password"],
    minLength: 6,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//sign jwt and return
UserSchema.methods.getSignedWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//match password to hashed password
UserSchema.methods.matchPassword = async function (matchedPassword) {
  return await bcrypt.compare(matchedPassword, this.password);
};

module.exports = model("User", UserSchema);
