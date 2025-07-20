import { createSearchParams } from "react-router";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const PETS_ENDPOINT = import.meta.env.VITE_PETS_ENDPOINT;

async function fetchGetPet(pet_id, species, size) {
  let data;

  const queryParams = createSearchParams({
    pet_id: pet_id,
    species: species,
  }).toString();

  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}?${queryParams}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error("Error");
    }

    data = await response.json();
  } catch (err) {
    console.log(err);
    throw Error(err);
  }

  return data;
}

export { fetchGetPet };
