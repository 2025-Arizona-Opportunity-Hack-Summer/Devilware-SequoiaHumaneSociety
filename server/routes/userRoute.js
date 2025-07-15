const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get("/find-user", userController.findUserByEmail);
userRoute.post("/sign-up", userController.createUser);
userRoute.put("/update/favorite-pets", userController.updateUserFavoritesPet);
userRoute.put("/update/questionnaire", userController.updateUserQuestionnaire);

module.exports = userRoute;
