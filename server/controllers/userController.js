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
    // Insert to database
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
    // Find user with email
    const user = await mongoClient.getDB().collection("users").findOne({ email: email });

    if (user === null) {
      // If the user does not exist, we do nothing
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    // Return the existed user
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
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");
    let user = await usersCollection.findOne({ email: email });

    if (user === null) {
      // If the user does not exist, we do nothing
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    // The user exists
    if (user.favoritePets === undefined || !user.favoritePets.includes(pet_id)) {
      // if the user does not have the pet in favorited pet list, add them in
      user = await usersCollection.findOneAndUpdate(
        { email: email },
        { $addToSet: { favoritePets: pet_id } },
        { returnDocument: "after" }
      );
    } else {
      // if the user already have the pet in favorited pet
      user = await usersCollection.updateOne(
        { email: email },
        { $pull: { favoritePets: pet_id } },
        { returnDocument: "after" }
      );
    }

    // return updated user
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
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");

    // Uppdate user
    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: email },
      { $set: { matchQuestions: questionnaire } },
      { returnDocument: "after" }
    );

    if (updatedUser === null) {
      // If the user does not exist, we do nothing
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    // return updated user
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
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");

    // Updated field in database
    const fieldToUpdate = `matchQuestions.${questionId}`;

    // Uppdate user
    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: email },
      { $set: { [fieldToUpdate]: value } },
      { returnDocument: "after" }
    );

    if (updatedUser === null) {
      // If the user does not exist, we do nothing
      res.status(400).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    // return updated user
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
