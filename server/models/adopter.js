const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

const AdopterSchema = new Schema({
  name: {
    firstName: { type: String, require: true },
    middleName: { type: String, require: true },
    lastName: { type: String, require: true },
  },
  dob: {
    type: String,
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

module.exports = Adopter;
