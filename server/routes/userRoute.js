const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get("/:email", userController.findUserByEmail);
userRoute.post("/", userController.createUser);
userRoute.put("/:email/favorite-pets", userController.updateUserFavoritesPet);
userRoute.put("/:email/questionnaire", userController.updateUserQuestionnaire);
userRoute.put("/:email/questionnaire/:questionId", userController.updateUserQuestionnaireById);

module.exports = userRoute;
