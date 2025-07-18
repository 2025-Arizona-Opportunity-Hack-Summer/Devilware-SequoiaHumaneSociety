const API_BASE_URL = import.meta.env.VITE_API_URL;
const USER_QUESTIONNAIRE_ENDPOINT = import.meta.env.VITE_USER_QUESTIONNAIRE_ENDPOINT;
const FIND_USER_ENDPOINT = import.meta.env.VITE_FIND_USER_ENDPOINT;
const REGISTER_ENDPOINT = import.meta.env.VITE_REGISTER_ENDPOINT;

async function fetchFindUserByEmail(email) {
  const endpoint = `${API_BASE_URL}/${FIND_USER_ENDPOINT}?email=${email}`;

  let user;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok && data.description === "User does not exist") {
      user = null;
    } else {
      user = data.content;
    }
  } catch (err) {
    console.log(err);
    throw Error(err);
  }

  return user;
}

async function fetchCreateUser(email, first_name, last_name, dob, gender) {
  const endpoint = `${API_BASE_URL}/${REGISTER_ENDPOINT}`;

  const body = {
    email: email,
    dob: dob,
    name: { firstName: first_name, lastName: last_name },
    gender: gender,
  };

  let user;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data.description);
    }

    user = data.content;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }

  return user;
}

async function fetchUpdateUserQuesionnaireBySessionStorage(email, updatedMatchQuestions) {
  const endpointUpdate = `${API_BASE_URL}/${USER_QUESTIONNAIRE_ENDPOINT}`;

  let user;
  try {
    const response = await fetch(endpointUpdate, {
      method: "PUT",
      body: JSON.stringify({ email: email, questionnaire: updatedMatchQuestions }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw Error(data.description);
    }

    user = data.content;
  } catch (err) {
    console.log(err);
    throw Error;
  }

  return user;
}
async function fetchUpdateUserQuestionnaireById(id, email, value) {
  const endpoint = `${API_BASE_URL}/${USER_QUESTIONNAIRE_ENDPOINT}/${id}`;

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify({
        email: email,
        value: value,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw Error("Error has occur");
    }
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

export {
  fetchUpdateUserQuestionnaireById,
  fetchFindUserByEmail,
  fetchCreateUser,
  fetchUpdateUserQuesionnaireBySessionStorage,
};
