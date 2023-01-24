const client = require("./client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function createUser({
  username,
  password,
  firstName,
  lastName,
  address,
  telephone,
  email,
}) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // console.log("THIS IS A USER PASSWORD------------>", password);
  // console.log("this is my hashed password--------->", hashedPassword);

  try {
    const { rows: [ user ] } = await client.query(
      `
        INSERT INTO users( username, password, "firstName", "lastName", address, telephone, email)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username;
        `, [username, hashedPassword, firstName, lastName, address, telephone, email] );

    // console.log("This is a user ------------>", user);
    return user;
  } catch (error) {
    throw error;
  }
}

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

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
};
