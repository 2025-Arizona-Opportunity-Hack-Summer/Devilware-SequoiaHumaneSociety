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

export { extractUniqueBreeds };
