const client = require("./client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// POST Functions
async function createUser({ username, password, email }) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // console.log("THIS IS A USER PASSWORD------------>", password);
  // console.log("this is my hashed password--------->", hashedPassword);

  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users( username, password, email )
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username;
        `,
      [username, hashedPassword, email]
    );

    // console.log("This is a user ------------>", user);
    return user;
  } catch (error) {
    throw error;
  }
}

// GET Functions
async function getUser({ username, password }) {
  const user = await getUserByUsername(username);
  const hashedPassword = user.password;
  let passwordsMatch = await bcrypt.compare(password, hashedPassword);
  if (passwordsMatch) {
    delete user.password;
    return user;
  } else {
    return null;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE id=$1;
        `,
      [userId]
    );
    delete user.password;
    console.log("THIS IS THE USER:", user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
        `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// PATCH Functions
async function editUser({ id, ...fields }) {
  const keys = Object.keys(fields);

  const setString = keys
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      const {
        rows: [updatedUser],
      } = await client.query(
        `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );

      // delete updatedUser.password;

      return updatedUser;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in editUser:", error);
    throw error;
  }
}

// DELETE Functions
async function deleteUser(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `DELETE FROM users
    WHERE id= $1
    RETURNING *;`,
      [id]
    );
    return deleted;
  } catch (error) {
    console.error("Error in deleteUsers", error);
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  editUser,
  deleteUser,
};
