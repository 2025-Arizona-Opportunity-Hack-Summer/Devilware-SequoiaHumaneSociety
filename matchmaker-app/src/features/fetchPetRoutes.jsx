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

async function fetchGetAllPets() {
  let data;

  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}`;

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

async function fetchCreatePet(body) {
  let data;

  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });

    data = await response.json();

    if (!response.ok) {
      throw Error(data.message);
    }
  } catch (err) {
    throw Error(err);
  }

  return data;
}

async function fetchUpdatePet(pet_id, body) {
  let data;

  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}/${pet_id}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });

    data = await response.json();

    if (!response.ok) {
      throw Error(data.message);
    }
  } catch (err) {
    throw Error(err);
  }

  return data;
}

async function fetchSetPetOnHold(pet_id, email) {
  let data;

  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}/${pet_id}/on-hold/${email}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json",
      },
    });

    data = await response.json();

    if (!response.ok) {
      throw Error(data.message);
    }
  } catch (err) {
    throw Error(err);
  }

  return data;
}

async function fetchSetPetAdopted(pet_id, email) {
  let data;

  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}/${pet_id}/adopted/${email}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json",
      },
    });

    data = await response.json();
    if (!response.ok) {
      throw Error(data.message);
    }
  } catch (err) {
    throw Error(err);
  }

  return data;
}

async function fetchDeleletePet(pet_id) {
  const searchParams = createSearchParams({ pet_id: pet_id }).toString();
  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}?${searchParams}`;

  try {
    const response = await fetch(endpoint, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw Error(data.message);
    }
  } catch (err) {
    throw Error(err);
  }

  return pet_id;
}

async function fetchMatchedPets(matchAnswers) {
  let data;
  const searchParams = createSearchParams(matchAnswers).toString();
  const endpoint = `${API_BASE_URL}/${PETS_ENDPOINT}/matchmaker?${searchParams}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(error.type);
    }

    data = await response.json();
  } catch (err) {
    throw Error(err);
  }

  return data;
}
export {
  fetchGetPet,
  fetchCreatePet,
  fetchGetAllPets,
  fetchUpdatePet,
  fetchSetPetOnHold,
  fetchSetPetAdopted,
  fetchDeleletePet,
  fetchMatchedPets,
};
