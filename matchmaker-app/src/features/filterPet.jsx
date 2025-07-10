function filterPet(petList = [], species = [], sort = "") {
  let result = petList;

  if (species !== null && species.length !== 0) {
    result = petList.filter((pet) => species.includes(pet.species));
  }

  if (sort !== null && sort === "Alphabetical A-Z") {
    result = result.sort((pet1, pet2) => pet1.name.localeCompare(pet2.name));
  }
  return result;
}

export { filterPet };
