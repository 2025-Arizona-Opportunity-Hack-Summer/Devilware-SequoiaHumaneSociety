const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get("/find-user", userController.findUserByEmail);
userRoute.post("/sign-up", userController.createUser);
userRoute.put("/favorite-pets", userController.updateUserFavoritesPet);
userRoute.put("/questionnaire", userController.updateUserQuestionnaire);
userRoute.put("/questionnaire/:questionId", userController.updateUserQuestionnaireById);

module.exports = userRoute;
