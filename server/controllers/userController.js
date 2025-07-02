const bcrypt = require("bcrypt");

const User = require("../models/user");
const Adopter = require("../models/adopter");
const Shelter = require("../models/shelter");

async function createUser(req, res, next) {
  const { role, password, email, address } = req.body;

  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const hashPassword = bcrypt.hashSync(password, salt);

  if (role === "shelter") {
    const { name } = req.body;

    try {
      const newShelter = new Shelter({
        email: email,
        password: hashPassword,
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
    const { name, dob, gender, pronounce } = req.body;

    try {
      const newAdopter = new Adopter({
        email: email,
        password: hashPassword,
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

async function findUser(req, res, next) {
  const { email, password } = req.query;

  try {
    const user = await User.findOne({ email: email });

    if (user === undefined) {
      res.status(400).json({ description: "User does not exist" });
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (isMatch == false) {
      res.status(400).json({ description: "Password does not correct" });
      return;
    }

    res.status(200).json({ description: "Sign in successfully", content: user });
  } catch (err) {
    res.status(400).json({ description: "Problem occurs at server. Please contact for help" });
  }
}
module.exports = {
  createUser,
  findUser,
};
