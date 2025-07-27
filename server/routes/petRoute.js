const express = require("express");
const petController = require("../controllers/petController.js");

const petRoute = express.Router();

petRoute.get("/", petController.findPets);
petRoute.post("/", petController.createPet);
petRoute.put("/:pet_id", petController.updatePet);
petRoute.delete("/", petController.deletePet);
petRoute.put("/:pet_id/on-hold/:email", petController.setPetOnHold);
petRoute.put("/:pet_id/adopted/:email", petController.setPetAdopted);

module.exports = petRoute;
