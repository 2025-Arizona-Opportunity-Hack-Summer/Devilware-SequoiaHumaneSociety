const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/sign-in", userController.findUserByEmail);
userRoute.post("/sign-up", userController.createUser);

module.exports = userRoute;
