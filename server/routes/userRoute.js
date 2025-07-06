const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.get("/", userController.findUserByEmail);
userRoute.post("/", userController.createUser);

module.exports = userRoute;
