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
    discriminatorKey: "user",
  }
);

const User = mongoose.model("User", UserSchema);

const AdopterSchema = new Schema({
  name: {
    firstName: { type: String, require: true },
    middleName: { type: String, require: true },
    lastName: { type: String, require: true },
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  pronounce: {
    type: String,
  },
  pet: {
    type: [Schema.ObjectId],
    ref: "Pet",
    require: true,
  },
});

const Adopter = User.discriminator("Adopter", AdopterSchema);

const ShelterSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  pet: {
    type: [Schema.ObjectId],
    ref: "Pet",
    require: true,
  },
});

const Shelter = User.discriminator("Shelter", ShelterSchema);

module.exports = {
  User,
  Adopter,
  Shelter,
};
