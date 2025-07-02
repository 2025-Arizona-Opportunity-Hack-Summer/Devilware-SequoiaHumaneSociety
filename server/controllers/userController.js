const User = require("../models/user");
const Adopter = require("../models/adopter");
const Shelter = require("../models/shelter");

async function createUser(req, res, next) {
  const { role } = req.body;

  if (role === "shelter") {
    const { username, password, email, address, name } = req.body;

    try {
      const newShelter = new Shelter({
        username: username,
        password: password,
        email: email,
        address: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        },
        name: name,
        pet: [],
      });

      await newShelter.save();

      res.status(201).json({ description: "Create user sucessully" });
    } catch (err) {
      res.status(400).json({ description: "Cannot create user", error: err });
    }
  } else if (role === "adopter") {
    const { username, password, email, address, name, dob, gender, pronounce } = req.body;

    try {
      const newAdopter = new Adopter({
        username: username,
        password: password,
        email: email,
        address: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
        },
        name: {
          firstName: name.firstName,
          middleName: name.middleName,
          lastName: name.lastName,
        },
        dob: dob,
        gender: gender,
        pronounce: pronounce,
        pet: [],
      });

      await newAdopter.save();

      res.status(201).json({ description: "Create user sucessully" });
    } catch (err) {
      res.status(400).json({ description: "Cannot create user", error: err });
    }
  } else {
    res.status(400).json({ description: "Role does not exist", error: err });
  }
}

module.exports = {
  createUser,
};
