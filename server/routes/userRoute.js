const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get("/find-user", userController.findUserByEmail);
userRoute.post("/sign-up", userController.createUser);

module.exports = userRoute;
