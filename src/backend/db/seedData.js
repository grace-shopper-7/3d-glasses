const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping all tables.....");

    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS cart_items;
    DROP TABLE IF EXISTS session;
    DROP TABLE IF EXISTS order_lines;
    DROP TABLE IF EXISTS payment_details;
    DROP TABLE IF EXISTS order_details;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
        `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Starting to build tables...");

    await client.query(
      `
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        telephone INTEGER,
        email VARCHAR(255) UNIQUE
    );

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        SKU VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        price DECIMAL,
        "photoURL" VARCHAR(255) NOT NULL
    );

    CREATE TABLE order_details (
        id SERIAL PRIMARY KEY,
        "userId" REFERENCES users,
        totalPrice DECIMAL,
        "paymentId" REFERENCES payment_details,
        "createdAt" TIMESTAMP,
        "modifiedAt" TIMESTAMP
    );

    CREATE TABLE payment_details (
        id SERIAL PRIMARY KEY,
        "orderId" REFERENCES order_details,
        amount INTEGER,
        provider VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL
    );

    CREATE TABLE order_lines (
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES order_details,
        "productId" INTEGER REFERENCES products
    );

    CREATE TABLE session (
        id SERIAL PRIMARY KEY,
        "userId" REFERENCES users,
        total DECIMAL
    );

    CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        "sessionId" INTEGER REFERENCES session,
        "productId" INTEGER REFERENCES products,
        quantity INTEGER
    );
    
    CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products,
        "userId" INTEGER REFERENCES users,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL
    );
    
    `
    );

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};

// CHECK ORDER_DTAIL AND PRODUCTS-- does "usersId" need to be user_id and wehn we reference "sessionId and ProductId, does our reference look good??"
//timeStamp????
// DO ALL TABLES NEED TO BE PUT IN QUOTATIONS WHEN BEING REFERENCED
