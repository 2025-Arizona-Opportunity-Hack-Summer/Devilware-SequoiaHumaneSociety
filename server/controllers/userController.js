// const bcrypt = require("bcrypt");

const mongoClient = require("../database");

async function createUser(req, res, next) {
  const { email, name, dob, gender } = req.body;

  try {
    await mongoClient
      .getDB()
      .collection("users")
      .insertOne({
        email: email,
        name: {
          firstName: name.firstName,
          lastName: name.lastName,
        },
        dob: dob,
        gender: gender,
        favoritePets: [],
        adoptedPets: [],
      });

    res.status(201).json({ description: "Create user successfully" });
  } catch (err) {
    res.status(400).json({ description: "Cannot create user", error: err });
  }
}

async function findUserByEmail(req, res, next) {
  const { email } = req.query;

  try {
    const user = await mongoClient.getDB().collection("users").findOne({ email: email });

    if (user === null) {
      res.status(400).json({ description: "User does not exist" });
      return;
    }

    res.status(200).json({ description: "Sign in successfully", content: user });
  } catch (err) {
    res.status(400).json({ description: "Problem occurs at server. Please contact for help" });
  }
}

module.exports = {
  createUser,
  findUserByEmail,
};
