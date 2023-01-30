const API_URL = "http://localhost:3000/api";

export const registerUser = async ({
  username,
  password,
  firstName,
  lastName,
  address,
  telephone,
  email
}) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${username}`,
        password: `${password}`,
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        address: `${address}`,
        telephone: `${telephone}`,
        email: `${email}`
      }),
    });
    const result = await response.json();
    console.log("THIS IS THE RESULT IN REGISTERUSER", result);
    return result;
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
        username,
        password,
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
      "user": {
        "id": 1,
        "username": "Guest"
      },
      "message": "You're logged in!",
      "token": "6584erth6sret54g6hdr5ty4ghd6r36eaq5r4g"
    }
    console.log(guestObject);
    return guestObject;
  } catch (error) {
    console.error("There was an error with logging in the guest. Now might be a good time to panic.")
  }
}