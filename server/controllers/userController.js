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
        matchQuestions: {},
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
    res.status(400).json({
      description: "Problem occurs at server. Please contact for help",
    });
  }
}

async function updateUserFavoritesPet(req, res, next) {
  const { pet_id, email } = req.body;

  try {
    const usersCollection = mongoClient.getDB().collection("users");
    const user = await usersCollection.findOne({ email: email });

    if (user === null) {
      res.status(400).json({ description: "User does not exist" });
      return;
    }

    if (user.favoritePets === undefined || !user.favoritePets.includes(pet_id)) {
      usersCollection.updateOne({ email: email }, { $addToSet: { favoritePets: pet_id } });
    } else {
      usersCollection.updateOne({ email: email }, { $pull: { favoritePets: pet_id } });
    }

    res.status(200).json({ description: "User update sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ description: "Soemthing wrong with server" });
  }
}

async function updateUserQuestionnaire(req, res, next) {
  const { questionnaire, email } = req.body;

  try {
    const usersCollection = mongoClient.getDB().collection("users");

    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: email },
      { $set: { matchQuestions: questionnaire } },
      { returnDocument: "after" }
    );

    if (updatedUser === null) {
      res.status(400).json({ description: "User does not exist" });
      return;
    }

    res.status(200).json({ description: "User update sucessfully", content: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ description: "Soemthing wrong with server" });
  }
}

async function updateUserQuestionnaireById(req, res, next) {
  const { questionId } = req.params;
  const { email, value } = req.body;

  try {
    const usersCollection = mongoClient.getDB().collection("users");

    const fieldToUpdate = `matchQuestions.${questionId}`;

    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: email },
      { $set: { [fieldToUpdate]: value } },
      { returnDocument: "after" }
    );

    if (updatedUser === null) {
      res.status(400).json({ description: "User does not exist" });
      return;
    }

    res.status(200).json({ description: "User update sucessfully", content: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ description: "Soemthing wrong with server" });
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUserFavoritesPet,
  updateUserQuestionnaire,
  updateUserQuestionnaireById,
};
