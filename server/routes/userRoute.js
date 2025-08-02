const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/", userController.createUser);
userRoute.get("/:email", userController.findUserByEmail);
userRoute.get("/:email/favorite-pets", userController.findUserFavoritePets);
userRoute.get("/:email/adopted-pets", userController.findUserAdoptedPets);
userRoute.get("/:email/on-hold-pets", userController.findOnHoldPets);
userRoute.put("/:email/favorite-pets/:pet_id", userController.updateUserFavoritePet);
userRoute.put("/:email/matchAnswers", userController.updateUserAnswers);
userRoute.put("/:email/matchAnswers/:question_id", userController.updateUserAnswerById);

module.exports = userRoute;
