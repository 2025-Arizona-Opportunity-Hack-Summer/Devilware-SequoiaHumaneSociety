const API_BASE_URL = import.meta.env.VITE_API_URL;
const USER_QUESTIONNAIRE_ENDPOINT = import.meta.env.VITE_USER_QUESTIONNAIRE_ENDPOINT;

async function fetchUpdateUserQuestionnaireById(id, email, value) {
  const endpoint = `${API_BASE_URL}/${USER_QUESTIONNAIRE_ENDPOINT}/${id}`;

  console.log(endpoint);
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

export { fetchUpdateUserQuestionnaireById };
