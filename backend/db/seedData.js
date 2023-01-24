const client = require("./client");
const { createOrderDetails } = require("./orders");
const { createProducts } = require("./products");
const { 
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers, 
} = require("./users");

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
          telephone TEXT,
          email VARCHAR(255) UNIQUE
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        SKU VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        price NUMERIC (6, 2),
        "photoURL" VARCHAR(255) NOT NULL
      );

      CREATE TABLE order_details (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "totalPrice" NUMERIC (6, 2),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE payment_details (
          id SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES order_details(id),
          amount INTEGER,
          provider VARCHAR(255) NOT NULL,
          status VARCHAR(255) NOT NULL
      );

      CREATE TABLE order_lines (
          id SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES order_details(id),
          "productId" INTEGER REFERENCES products(id),
          quantity INTEGER,
          UNIQUE ("orderId", "productId")
      );

      CREATE TABLE session (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          total NUMERIC (6, 2)
      );

      CREATE TABLE cart_items (
          id SERIAL PRIMARY KEY,
          "sessionId" INTEGER REFERENCES session(id),
          "productId" INTEGER REFERENCES products(id),
          quantity INTEGER,
          UNIQUE ("sessionId", "productId")
      );
    
      CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "userId" INTEGER REFERENCES users(id),
          title VARCHAR(255) NOT NULL,
          content VARCHAR(255) NOT NULL,
          UNIQUE ("productId", "userId")
      );
    `
    );

    console.log("Finished building tables!");
  } catch (error) {
    console.error("Error building tables!");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        username: "albert",
        password: "bertie99",
        firstName: "Albert",
        lastName: "bertie",
        address: "123 Elmer Lane",
        telephone: "555-555-5555",
        email: "user@123.com",
      },
      {
        username: "sandra",
        password: "sandra123",
        firstName: "Sandra",
        lastName: "Parker",
        address: "123 Elmer Lane",
        telephone: "123-123-1234",
        email: "",
      },
      {
        username: "glamgal",
        password: "glamgal123",
        firstName: "Glamgal",
        lastName: "Glamerous",
        address: "123 Elmer Lane",
        telephone: "",
        email: "Glamgal@123.com",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function createInitialProducts() {
  console.log("Starting to create Products");
  try {
    const productsToCreate = [
      {
        name: "glasses",
        description: "desc1",
        SKU: "001-001-001",
        category: "glasses",
        price: "4.99",
        photoURL:
          "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
      },

      {
        name: "glasses1",
        description: "desc2",
        SKU: "002-002-002",
        category: "glasses",
        price: "2.99",
        photoURL:
          "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
      },

      {
        name: "glasses2",
        description: "desc3",
        SKU: "003-003-003",
        category: "accessories",
        price: "5.99",
        photoURL:
          "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
      },

      {
        name: "glasses3",
        description: "desc4",
        SKU: "004-004-004",
        category: "glasses",
        price: "7.99",
        photoURL:
          "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProducts));

    console.log("Products Created");
    console.log(products);
    console.log("Finished creating products");
  } catch (error) {
    console.log("Error Creating Products");
    throw error;
  }
}

async function createInitalOrderDetails() {
  console.log("Starting to create order details");
  const [albert, sandra, glamgal] = await getAllUsers();

  try {
    const orderDetailsToCreate = [
      { userId: albert.id, totalPrice: "5.99"},
      { userId: sandra.id, totalPrice: "20.99" },
      { userId: sandra.id, totalPrice: "3.99" },
      { userId: glamgal.id, totalPrice: "3.99" }
    ];
    // Revisit: add modifiedAt timestamps to above orderDetails
    const orderDetails = await Promise.all(
      orderDetailsToCreate.map(createOrderDetails)
    );
    console.log("Order details created", orderDetails);
  } catch (error) {
    console.log("Error creating order details");
    throw error;
  }
}

async function createInitialOrderLines() {
  console.log("Starting to create order lines.");
  const [albertOrder1, sandraOrder1, sandraOrder2, glamgalOrder1] = await getAllOrders();
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitalOrderDetails();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
  createInitialUsers,
  createInitialProducts,
  createInitalOrderDetails,
};

// looking at fitness tracker for function createInitialRoutineActivities, how do we know what info to provide?
