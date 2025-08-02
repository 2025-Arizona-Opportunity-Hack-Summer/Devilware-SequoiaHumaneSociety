const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/", userController.createUser);
userRoute.get("/:email", userController.findUserByEmail);
userRoute.get("/:email/favorite-pets", userController.findUserFavoritePets);
userRoute.put("/:email/favorite-pets/:pet_id", userController.updateUserFavoritePet);
userRoute.put("/:email/matchAnswers", userController.updateUserQuestionnaire);
userRoute.put("/:email/matchAnswers/:question_id", userController.updateUserQuestionnaireById);

module.exports = userRoute;
