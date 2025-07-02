const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    address: {
      addressLine1: { type: String, require: true },
      addressLine2: { type: String },
      city: { type: String, require: true },
      state: { type: String, require: true },
      zipCode: { type: String, require: true },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
