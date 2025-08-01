function extractUniqueBreeds(petList = []) {
  const st = new Set();
  for (const pet of petList) {
    for (const breed of pet.breed) {
      st.add(breed);
    }
  }

  const uniqueBreed = [];

  for (const pet of st) {
    uniqueBreed.push(pet);
  }

  return uniqueBreed;
}

function filterPetsByCriteria(petList = [], species = [], breed = [], activeLevel = [], size = [], sortFilter = "") {
  let result = petList;

  if (species !== null && species.length !== 0) {
    result = petList.filter((pet) => species.includes(pet.species));
  }

  if (breed !== null && breed.length !== 0) {
    result = result.filter((pet) => {
      for (const breedItem of pet.breed) {
        if (breed.includes(breedItem)) {
          return true;
        }
      }

      return false;
    });
  }

  // Create filter for active level

  if (size !== null && size.length !== 0) {
    result = [...result].filter((pet) => {
      if (size.includes("Large") && pet.weight > 60) {
        return true;
      } else if (size.includes("Medium") && pet.weight >= 25 && pet.weight <= 60) {
        return true;
      } else if (size.includes("Small") && pet.weight < 25) {
        return true;
      }

      return false;
    });
  }
  if (sortFilter !== null && sortFilter === "Alphabetical A-Z") {
    result = [...result].sort((pet1, pet2) => pet1.name.localeCompare(pet2.name));
  } else if (sortFilter !== null && sortFilter === "Alphabetical Z-A") {
    result = [...result].sort((pet1, pet2) => pet2.name.localeCompare(pet1.name));
  }

  return result;
}

function isCatSpecies(breed) {
  const catBreeds = ["Domestic_Medium_Hair", "Domestic_Long_Hair", "Domestic_Shorthair", "Mix", "Siamese"];

  return catBreeds.includes(breed);
}

export { extractUniqueBreeds, filterPetsByCriteria, isCatSpecies };
