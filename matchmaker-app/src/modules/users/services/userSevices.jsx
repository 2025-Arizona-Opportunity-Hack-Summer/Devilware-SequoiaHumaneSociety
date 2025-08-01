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

async function fetchUpdateUserQuesionnaireBySessionStorage(email, updatedMatchQuestions) {
  const endpointUpdate = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/${USER_QUESTIONNAIRE_ENDPOINT}`;

  let user;
  try {
    const response = await fetch(endpointUpdate, {
      method: "PUT",
      body: JSON.stringify({ questionnaire: updatedMatchQuestions }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data.error);
    }

    user = data;
  } catch (err) {
    console.log(err);
    throw Error;
  }

  return user;
}
async function fetchUpdateUserQuestionnaireById(id, email, value) {
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
}

async function fetchUpdateFavoritePetById(email, pet_id) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/${FAVORITE_PET_ENDPOINT}/${pet_id}`;
  let user;
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
    user = data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

async function fetchFindFavoritePets(email) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}/${email}/${FAVORITE_PET_ENDPOINT}`;

  let pets;

  console.log(endpoint);
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(data.error);
    }
    const data = await response.json();

    console.log(data);
    pets = data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }

  return pets;
}
export {
  fetchUpdateUserQuestionnaireById,
  fetchUserProfileByEmail,
  fetchUpdateUserQuesionnaireBySessionStorage,
  fetchUpdateFavoritePetById,
  fetchFindFavoritePets,
};
