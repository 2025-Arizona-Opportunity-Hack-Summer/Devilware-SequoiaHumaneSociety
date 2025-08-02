const API_BASE_URL = import.meta.env.VITE_API_URL;
const USER_ENDPOINT = import.meta.env.VITE_USER_ENDPOINT;

async function fetchFindUserByEmail(email) {
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

async function fetchCreateUser(email, first_name, last_name, dob, gender) {
  const endpoint = `${API_BASE_URL}/${USER_ENDPOINT}`;

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
      throw Error(data.error);
    }

    user = data;
  } catch (err) {
    console.log(err);
    throw Error(err);
  }

  return user;
}

export { fetchFindUserByEmail, fetchCreateUser };
