const express = require("express");
const userController = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/", userController.createUser);

module.exports = userRoute;
