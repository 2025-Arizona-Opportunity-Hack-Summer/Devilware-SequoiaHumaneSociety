const express = require("express");
const petController = require("../controllers/petController.js");

const petRoute = express.Router();

petRoute.get("/", petController.findPets);
petRoute.post("/", petController.createPet);
petRoute.get("/matchmaker", petController.findMatchedPets);
petRoute.get("/:pet_id", petController.findPetById);
petRoute.put("/:pet_id", petController.updatePet);
petRoute.delete("/:pet_id", petController.deletePet);
petRoute.put("/:pet_id/on-hold/:email", petController.setPetOnHold);
petRoute.put("/:pet_id/adopted/:email", petController.setPetAdopted);
petRoute.get("/matchmaker", petController.findMatchedPets);

module.exports = petRoute;
