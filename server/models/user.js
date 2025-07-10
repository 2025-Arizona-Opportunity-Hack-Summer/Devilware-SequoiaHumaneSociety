const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: false,
    },
    displayName: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    address: {
      addressLine1: { type: String, required: false },
      addressLine2: { type: String },
      city: { type: String, required: false },
      state: { type: String, required: false },
      zipCode: { type: String, required: false },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;