const mongoose = require("mongoose");
const User = require("./user");

const Schema = mongoose.Schema;

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

module.exports = Shelter;
