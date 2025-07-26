const express = require("express");
const petController = require("../controllers/petController.js");

const petRoute = express.Router();

petRoute.get("/", petController.findPets);
petRoute.post("/", petController.createPet);
petRoute.put("/:pet_id", petController.updatePet);

module.exports = petRoute;
