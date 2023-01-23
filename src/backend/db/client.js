// const { Pool } = require("pg");

// const connectionString =
//   process.env.DATABASE_URL || "https://localhost:5173/threedglasses";

// const client = new Pool({
//   connectionString,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : undefined,
// });

// module.exports = client;

// ---------------------------------------------------------------------

// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'threedglasses';

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5173/${DB_NAME}`;

let client;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: 'localhost',
    port: 5173,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });
} else {
  // local / heroku client config
  client = new Client(DB_URL);
}

module.exports = client;
