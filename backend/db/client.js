const { Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "http://localhost:5432/threedglasses";

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;

// ---------------------------------------------------------------------
// ----LET THIS CODE STAND AS MONUMENT TO WHAT WAS HOPEFULLY THE MOST---
// -------SERIOUS ERROR TO OCCUR DURING THE CODING OF THIS PROJECT------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---THANK YOU TO THE BRAVE INSTRUCTORS WHO AIDED US DURING OUR TIME---
// -------------------------------OF NEED-------------------------------
// ---------------------------------------------------------------------

// // require(“dotenv”).config({path:__dirname+”../.env”})
// require('dotenv').config({path:'/home/gunlock/fullstack/course_work/capstone/3d-glasses/backend'+'/.env'});

// // Connect to DB
// const { Pool } = require('pg');

// // change the DB_NAME string to whatever your group decides on
// const DB_NAME = 'threedglasses';

// const DB_URL = {connectionString: process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`,
// ssl: process.env.NODE_ENV === 'production' ?  { rejectUnauthorized: false }: undefined};
// // process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

// let client;

// // github actions client config
// if (process.env.CI) {
//   client = new Pool({
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: 'postgres',
//     database: 'postgres',
//   });
// } else {
//   // local / heroku client config

//   client = new Pool(DB_URL);
// }

// console.log(DB_URL);

// module.exports = client;
