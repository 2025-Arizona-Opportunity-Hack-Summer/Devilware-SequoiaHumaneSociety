const express = require("express");
const petController = require("../controllers/petController.js");

const petRoute = express.Router();

petRoute.get("/", petController.findPets);

module.exports = petRoute;
