// const bcrypt = require("bcrypt");

const mongoClient = require("../database");

async function createUser(req, res, next) {
  const { email, name, dob, gender } = req.body;

  const newUser = {
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
  };
  try {
    await mongoClient.getDB().collection("users").insertOne(newUser);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function findUserByEmail(req, res, next) {
  const { email } = req.params;

  try {
    const user = await mongoClient.getDB().collection("users").findOne({ email: email });

    if (user === null) {
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function updateUserFavoritesPet(req, res, next) {
  const { email } = req.params;
  const { pet_id } = req.body;

  try {
    const usersCollection = mongoClient.getDB().collection("users");
    const user = await usersCollection.findOne({ email: email });

    if (user === null) {
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    if (user.favoritePets === undefined || !user.favoritePets.includes(pet_id)) {
      usersCollection.updateOne({ email: email }, { $addToSet: { favoritePets: pet_id } });
    } else {
      usersCollection.updateOne({ email: email }, { $pull: { favoritePets: pet_id } });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function updateUserQuestionnaire(req, res, next) {
  const { email } = req.params;
  const { questionnaire } = req.body;

  try {
    const usersCollection = mongoClient.getDB().collection("users");

    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: email },
      { $set: { matchQuestions: questionnaire } },
      { returnDocument: "after" }
    );

    if (updatedUser === null) {
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

async function updateUserQuestionnaireById(req, res, next) {
  const { questionId, email } = req.params;
  const { value } = req.body;

  try {
    const usersCollection = mongoClient.getDB().collection("users");

    const fieldToUpdate = `matchQuestions.${questionId}`;

    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: email },
      { $set: { [fieldToUpdate]: value } },
      { returnDocument: "after" }
    );

    if (updatedUser === null) {
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "Problem occurs at server. Please contact for help",
      detail: err,
    });
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUserFavoritesPet,
  updateUserQuestionnaire,
  updateUserQuestionnaireById,
};
