function filterPet(petList = [], species = [], breed = [], activeLevel = [], size = [], sortFilter = "") {
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

  if (sortFilter !== null && sortFilter === "Alphabetical A-Z") {
    result = [...result].sort((pet1, pet2) => pet1.name.localeCompare(pet2.name));
  } else if (sortFilter !== null && sortFilter === "Alphabetical Z-A") {
    result = [...result].sort((pet1, pet2) => pet2.name.localeCompare(pet1.name));
  }

  return result;
}

export { filterPet };
