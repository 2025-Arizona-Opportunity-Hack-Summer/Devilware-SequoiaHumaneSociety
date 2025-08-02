const mongoClient = require("../database");
const { ObjectId } = require("mongodb");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = require("../s3");
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
    matchAnswers: {},
  };
  try {
    // Insert to database
    await mongoClient.getDB().collection("users").insertOne(newUser);

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
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
      res.status(404).json({
        error: "UserNotFound",
        message: "The provided credentials do not match an active user account",
      });
      return;
    }

    // Return the existed user
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
      detail: err,
    });
  }
}

async function findUserFavoritePets(req, res, next) {
  const { email } = req.params;

  try {
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");
    let user = await usersCollection.findOne({ email: email });

    if (user === null) {
      // If the user does not exist, we do nothing
      res.status(404).json({
        error: "UserNotFound",
        message: "The provided credentials do not match an active user account",
      });
      return;
    }
    const favoritePetIds = user.favoritePets.map((id) => ObjectId.createFromHexString(id));

    const pets = await mongoClient
      .getDB()
      .collection("pets")
      .find({ _id: { $in: favoritePetIds } })
      .toArray();

    for (const pet of pets) {
      // const imagesUrl = [];
      const imagesUrlPromises = [];

      for (const image of pet.images) {
        const getObjectParam = {
          Bucket: process.env.BUCKET_NAME,
          Key: image,
        };
        const command = new GetObjectCommand(getObjectParam);
        const url = getSignedUrl(s3Client, command, { expiresIn: 3600 * 24 });
        imagesUrlPromises.push(url);
      }
      pet.imagesURL = await Promise.all(imagesUrlPromises);
    }

    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
      detail: err,
    });
  }
}

async function updateUserFavoritePet(req, res, next) {
  const { email, pet_id } = req.params;

  try {
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");
    let user = await usersCollection.findOne({ email: email });

    if (user === null) {
      // If the user does not exist, we do nothing
      res.status(404).json({
        error: "UserNotFound",
        message: "The provided credentials do not match an active user account",
      });
      return;
    }

    const pet = await mongoClient
      .getDB()
      .collection("pets")
      .findOne({ _id: ObjectId.createFromHexString(pet_id) });

    if (pet === null) {
      res.status(404).json({
        error: "PetNotFound",
        message: "Cannot find a pet with the provided identifier",
      });
      return;
    }
    // The user exists
    let action = "";
    if (user.favoritePets === undefined || !user.favoritePets.includes(pet_id)) {
      // if the user does not have the pet in favorited pet list, add them in
      user = await usersCollection.findOneAndUpdate({ email: email }, { $addToSet: { favoritePets: pet_id } });
      action = "add";
    } else {
      // if the user already have the pet in favorited pet
      user = await usersCollection.updateOne({ email: email }, { $pull: { favoritePets: pet_id } });
      action = "remove";
    }

    // return updated user
    res.status(200).json({
      action: action,
      pet_id: pet_id,
    });
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
      detail: err,
    });
  }
}

async function updateUserAnswers(req, res, next) {
  const { email } = req.params;
  const { matchAnswers } = req.body;

  try {
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");

    // Uppdate user
    const updatedUser = await usersCollection.findOneAndUpdate(
      { email: email },
      { $set: { matchAnswers: matchAnswers } }
    );

    if (updatedUser === null) {
      // If the user does not exist, we do nothing
      res.status(404).json({
        error: "UserNotFound",
        message: "The provided credentials do not match an active user account",
      });
      return;
    }

    res.status(204).json();
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
      detail: err,
    });
  }
}

async function updateUserAnswerById(req, res, next) {
  const { question_id, email } = req.params;
  const { value } = req.body;

  try {
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");

    // Updated field in database
    const fieldToUpdate = `matchAnswers.${question_id}`;

    // Uppdate user
    const updatedUser = await usersCollection.findOneAndUpdate({ email: email }, { $set: { [fieldToUpdate]: value } });

    if (updatedUser === null) {
      // If the user does not exist, we do nothing
      res.status(404).json({
        error: "UserNotFound",
        message: "Cannot find user",
      });
      return;
    }

    res.status(204).json();
  } catch (err) {
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
      detail: err,
    });
  }
}

async function findUserAdoptedPets(req, res, next) {
  const { email } = req.params;
  try {
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");
    let user = await usersCollection.findOne({ email: email });

    if (user === null) {
      // If the user does not exist, we do nothing
      res.status(404).json({
        error: "UserNotFound",
        message: "The provided credentials do not match an active user account",
      });
      return;
    }

    for (const pet of user.adoptedPets) {
      // const imagesUrl = [];
      const imagesUrlPromises = [];

      for (const image of pet.images) {
        const getObjectParam = {
          Bucket: process.env.BUCKET_NAME,
          Key: image,
        };
        const command = new GetObjectCommand(getObjectParam);
        const url = getSignedUrl(s3Client, command, { expiresIn: 3600 * 24 });
        imagesUrlPromises.push(url);
      }
      pet.imagesURL = await Promise.all(imagesUrlPromises);
    }

    res.status(200).json(user.adoptedPets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
      detail: err,
    });
  }
}

async function findOnHoldPets(req, res, next) {
  const { email } = req.params;
  try {
    // Find the user with email
    const usersCollection = mongoClient.getDB().collection("users");
    let user = await usersCollection.findOne({ email: email });

    if (user === null) {
      // If the user does not exist, we do nothing
      res.status(404).json({
        error: "UserNotFound",
        message: "The provided credentials do not match an active user account",
      });
      return;
    }

    const pets = await mongoClient.getDB().collection("pets").find({ on_hold_email: email }).toArray();

    for (const pet of pets) {
      // const imagesUrl = [];
      const imagesUrlPromises = [];

      for (const image of pet.images) {
        const getObjectParam = {
          Bucket: process.env.BUCKET_NAME,
          Key: image,
        };
        const command = new GetObjectCommand(getObjectParam);
        const url = getSignedUrl(s3Client, command, { expiresIn: 3600 * 24 });
        imagesUrlPromises.push(url);
      }
      pet.imagesURL = await Promise.all(imagesUrlPromises);
    }

    res.status(200).json(pets);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "InternalServerError",
      message: "An unexpected error occurred on the server. Please contact support.",
      detail: err,
    });
  }
}
module.exports = {
  createUser,
  findUserByEmail,
  updateUserFavoritePet,
  updateUserAnswers,
  updateUserAnswerById,
  findUserFavoritePets,
  findUserAdoptedPets,
  findOnHoldPets,
};
