const API_URL = "/api";

export const registerUser = async (username, password, email) => {
  console.log("THESE ARE THEM:", username, password, email);
  try {
    const response1 = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    });
    const result1 = await response1.json();
    console.log("THIS IS THE RESULT IN REGISTERUSER(user)", result1);

    const response2 = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${result1.token}`,
      },
    });
    const result2 = await response2.json();
    console.log("THIS IS THE RESULT IN REGISTERUSER(session)", result2);

    const toReturn = { userdata: result1, session: result2 };
    return toReturn;
  } catch (err) {
    console.error("There was a problem registering: ", err);
    alert("Registration Error!");
  }
};

export const logInUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(
      "The username and password entered doesn't match our records: ",
      error
    );
    alert("Login error");
  }
};

export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Cannot fetch that user. Invalid token", err);
  }
};

export const guestLogin = async () => {
  try {
    // const response = await fetch(`${API_URL}/users/login`, {
    //   method: "POST",
    //   headers: {
    //     "Conent-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username: "Guest",
    //     password: "password"
    //   })
    // }).then(response => response.json())
    //   .then(result => {
    //     console.log(result)
    //   })
    //   .catch(console.error);
    // Above code to be implemented when Front/Backend hookup enabled

    const guestObject = {
      user: {
        id: 1,
        username: "Guest",
      },
      message: "You're logged in!",
      token: "6584erth6sret54g6hdr5ty4ghd6r36eaq5r4g",
    };
    console.log(guestObject);
    return guestObject;
  } catch (error) {
    console.error(
      "There was an error with logging in the guest. Now might be a good time to panic."
    );
  }
};
