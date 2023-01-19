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

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { username: "albert", password: "bertie99" , firstName: "Albert", lastName: "bertie", address:"123 Elmer Lane", telephone: "555-555-5555", email: "user@123.com"},
      { username: "sandra", password: "sandra123", firstName: "Sandra", lastName: "Parker", address:"123 Elmer Lane", telephone: "123-123-1234", email: ""},
      { username: "glamgal", password: "glamgal123", firstName: "Glamgal", lastName: "Glamerous", address:"123 Elmer Lane", telephone: "", email: "Glamgal@123.com" },
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
  console.log('Starting to create Products');
  try {
    const productsToCreate = [
      {name: "glasses", description: "desc1", SKU: "001-001-001", category: "glasses", price: "4.99", photoURL: "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260"},

      {name: "glasses1", description: "desc2", SKU: "002-002-002", category: "glasses", price: "2.99", photoURL: "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260"},

      {name: "glasses2", description: "desc3", SKU: "003-003-003", category: "accessories", price: "5.99", photoURL: "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260"},

      {name: "glasses3", description: "desc4", SKU: "004-004-004", category: "glasses", price: "7.99", photoURL: "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260"},
           
    ]
    const products = await Promise.all(productsToCreate.map(createProducts));

    console.log('Products Created');
    console.log(products);
    console.log('Finished creating products');
  } catch (error) {
    console.log('Error Creating Products'); 
    throw error;
  }
    
}

async function createInitalOrderDetails() {
  console.log('Starting to create order details');

  
  try {
    const orderDetailsToCreate = [
      {userId: "3", totalPrice: "5.99"},
      {userId: "4", totalPrice: "20.99"},
      {userId: "5", totalPrice: "3.99"},
      {userId: "6", totalPrice: "0.99"},

    ]
    const orderDetails = await Promise.all(orderDetailsToCreate.map(createOrderDetails))
    console.log("Order details created", orderDetails);
  } catch (error) {
    console.log('Error creating order details');
    throw error;
  } 
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
