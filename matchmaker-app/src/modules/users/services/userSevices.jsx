const API_BASE_URL = import.meta.env.VITE_API_URL;
const USER_ENDPOINT = import.meta.env.VITE_USER_ENDPOINT;
const USER_QUESTIONNAIRE_ENDPOINT = import.meta.env.VITE_USER_QUESTIONNAIRE_ENDPOINT;
const FAVORITE_PET_ENDPOINT = import.meta.env.VITE_FAVORITE_PET_ENDPOINT;

async function fetchUserProfileByEmail(email) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}`;

  let user;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok && data.error === "UserNotFound") {
      user = null;
    } else {
      user = data;
    }
  } catch (err) {
    console.log(err);
    throw Error(err);
  }

  return user;
}

async function fetchUpdateUserAnswers(email, updatedMatchAnswers) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/${USER_QUESTIONNAIRE_ENDPOINT}`;
  console.log(endpoint);
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({ matchAnswers: updatedMatchAnswers }),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw Error(data.error);
    }
  } catch (err) {
    console.log(err);
    throw Error;
  }
  return updatedMatchAnswers;
}
async function fetchUpdateUserAnswerById(id, email, value) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/${USER_QUESTIONNAIRE_ENDPOINT}/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({
        value: value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw Error(data.error);
    }
  } catch (err) {
    throw Error(err);
  }

  return true;
}

async function fetchUpdateFavoritePetById(email, pet_id) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/${FAVORITE_PET_ENDPOINT}/${pet_id}`;
  let id_return;
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({}),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw Error(data.error);
    }

    id_return = data.pet_id;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }

  return id_return;
}

async function fetchFindFavoritePets(email) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/${FAVORITE_PET_ENDPOINT}`;

  let pets;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(data.error);
    }
    const data = await response.json();

    pets = data;
  } catch (err) {
    throw Error(err);
  }

  return pets;
}

async function fetchFindAdoptedPets(email) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/adopted-pets`;

  console.log(endpoint);
  let pets;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(data.error);
    }
    const data = await response.json();

    pets = data;
  } catch (err) {
    throw Error(err);
  }

  return pets;
}

async function fetchFindOnHoldPets(email) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/on-hold-pets`;

  console.log(endpoint);
  let pets;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(data.error);
    }
    const data = await response.json();

    pets = data;
  } catch (err) {
    throw Error(err);
  }

  return pets;
}
export {
  fetchUpdateUserAnswerById,
  fetchUserProfileByEmail,
  fetchUpdateUserAnswers,
  fetchUpdateFavoritePetById,
  fetchFindFavoritePets,
  fetchFindAdoptedPets,
  fetchFindOnHoldPets,
};
