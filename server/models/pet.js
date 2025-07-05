const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PetSchema = new Schema(
  {
    type: { type: String, require: true },
    breed: { type: String },
    name: { type: String },
    desriptions: { type: Object, require: true },
    attributes: { type: Object, require: true },
    information: { type: String },
    images: { type: [String], require: true },
    documents: { type: [String], require: true },
    adopterId: { type: Schema.ObjectId, ref: "Adopter" },
    shelterId: { type: Schema.ObjectId, ref: "Shelter", require: true },
    holderId: { type: Schema.ObjectId, ref: "Adopter" },
    holderStartTime: { type: Date },
    holderEndTime: { type: Date },
    adoptionFee: { type: Number, require: true },
  },
  {
    collection: "pets",
  }
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;
