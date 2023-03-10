const client = require("./client");
const { createOrderLine } = require("./orderItems");
const { createOrderDetails, getAllOrders, getFullOrders } = require("./orders");
const { createProducts, getProductsWithoutReviews } = require("./products");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getAllUsers,
  editUser,
} = require("./users");

const { createPaymentDetails } = require("./paymentDetails");
const { createSession, getFullCarts } = require("./cart");
const { createCartItems, getCartItemsBySessionId } = require("./cartItems");

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
          email VARCHAR(255) UNIQUE NOT NULL,
          regdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        sku VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(255) NOT NULL,
        price NUMERIC (6, 2),
        "photoURL" VARCHAR(255) NOT NULL
      );

      CREATE TABLE order_details (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        amount NUMERIC (6, 2),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE payment_details (
          id SERIAL PRIMARY KEY,
          amount NUMERIC (6, 2),
          "orderId" INTEGER REFERENCES order_details(id),
          ccn VARCHAR(20) NOT NULL,
          cvc VARCHAR(3) NOT NULL,
          exp DATE NOT NULL,
          billing VARCHAR(255),
          name VARCHAR(255) NOT NULL,
          "userId" INTEGER REFERENCES users(id),
          UNIQUE ("orderId", "userId")
      );

      CREATE TABLE order_lines (
          id SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES order_details(id),
          "productId" INTEGER REFERENCES products(id),
          quantity INTEGER,
          UNIQUE ("orderId", id, "productId")
      );

      CREATE TABLE session (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "totalPrice" NUMERIC (6, 2)
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
        username: "AdminAlbert",
        password: "bertie99",
        // firstName: "Albert",
        // lastName: "bertie",
        // address: "123 Elmer Lane",
        // telephone: "555-555-5555",
        email: "user@123.com",
      },
      {
        username: "AdminSandra",
        password: "sandra123",
        // firstName: "Sandra",
        // lastName: "Parker",
        // address: "123 Elmer Lane",
        // telephone: "123-123-1234",
        email: "",
      },
      {
        username: "AdminGlamgal",
        password: "glamgal123",
        // firstName: "Glamgal",
        // lastName: "Glamerous",
        // address: "123 Elmer Lane",
        // telephone: "",
        email: "Glamgal@123.com",
      },
      {
        username: "AdminFaker",
        password: "fakerboi",
        // firstName: "Faker",
        // lastName: "Gamer",
        // address: "1111 Gamer Street",
        // telephone: "",
        email: "faker@lol.dota",
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

// async function editInitialUsers() {
//   console.log("Starting to edit users...");
//   try {
//     const usersToEdit = [
//       {
//         id: 1,
//         username: "albert",
//         password: "bertie99",
//         firstName: "Alberto",
//         lastName: "Bernie",
//         address: "123 Elmer Fudd Lane",
//         telephone: "565-656-5656",
//         email: "user@12334.com",
//       },
//       {
//         id: 2,
//         username: "sandra",
//         password: "sandra123",
//         firstName: "Sandran",
//         lastName: "Parkery",
//         address: "123 Elmer Lane",
//         telephone: "123-123-1234",
//         email: "somethingsomething@hotmail.com",
//       },
//       {
//         id: 3,
//         username: "glamgal",
//         password: "glamgal123",
//         firstName: "Glamgal",
//         lastName: "Glamerous",
//         address: "123 Elmer Lane",
//         telephone: "867-5309",
//         email: "Glamgal@123.com",
//       },
//       {
//         id: 4,
//         username: "faker",
//         password: "fakerboi",
//         firstName: "Faker",
//         lastName: "Gamer",
//         address: "1111 Gamer Street",
//         telephone: "867-530-9999",
//         email: "faker@lol.dota",
//       },
//     ];
//     const users = await Promise.all(usersToEdit.map(editUser));

//     console.log("Users edited:");
//     console.log(users);
//     console.log("Finished editing users!");
//   } catch (error) {
//     console.error("Error editing users!");
//     throw error;
//   }
// }

async function createInitialProducts() {
  console.log("Starting to create Products");
  try {
    const productsToCreate = [
      {
        name: "Four Eyes",
        description: "Double the eyes",
        sku: "001-001-001",
        category: "glasses",
        price: "6.96",
        photoURL:
          "https://cdn.shopify.com/s/files/1/0573/4884/9821/products/170556_Matsuda_2809H-V2_BS-BL_2_1400x.jpg?v=1645116885",
      },

      {
        name: "Stunnars",
        description: "Be stunnin",
        sku: "002-002-002",
        category: "glasses",
        price: "7.96",
        photoURL:
          "https://cdn.shopify.com/s/files/1/0283/2150/products/d_1800x1800_58995140-d079-4c17-b8f9-6ed51fc9a836_1024x1024.jpg?v=1656618523",
      },

      {
        name: "Ray Stoppas",
        description: "Doofenshmirtz",
        sku: "003-003-003",
        category: "glasses",
        price: "8.96",
        photoURL:
          "https://cdn.shopify.com/s/files/1/0440/3576/8475/products/Terza_Frame_0085_front_400X400.jpg?v=1655809549",
      },

      {
        name: "Eye Spy",
        description: "Juni Cortez",
        sku: "004-004-004",
        category: "glasses",
        price: "9.96",
        photoURL:
          "https://cdn.shopify.com/s/files/1/0148/9585/products/BLNDRS_HardThunder_EclipseX2_Quarter_712x.jpg?v=1613151840",
      },
      {
        name: "Fom Tord",
        description: "Fashionable",
        sku: "005-005-005",
        category: "glasses",
        price: "10.96",
        photoURL:
          "https://cdn.shopify.com/s/files/1/0017/7874/5403/products/the-influencer-sunglasses-686212.jpg?v=1670000462",
      },
      {
        name: "Loliver Peopls",
        description: "Dirty Martiny",
        sku: "006-006-006",
        category: "glasses",
        price: "11.96",
        photoURL:
          "https://optimaxweb.glassesusa.com/image/upload/f_auto,q_auto/ms/media/catalog_product/1/000164__f_1.jpg",
      },
      {
        name: "Bay-Rans",
        description: "Ban the rays",
        sku: "007-007-007",
        category: "glasses",
        price: "12.96",
        photoURL:
          "https://images.ray-ban.com/is/image/RayBan/8056597259835__002.png?impolicy=RB_RB_FBShare",
      },
      {
        name: "Koapley",
        description: "Oak Tree",
        sku: "008-008-008",
        category: "glasses",
        price: "13.96",
        photoURL:
          "https://assets.oakley.com/is/image/OakleyEYE/888392105271_radar-ev-pitch_polished-white-prizm-field_main_001.png?impolicy=SEO_4x3",
      },
      {
        name: "Sain Laurant",
        description: "Miracles",
        sku: "009-009-009",
        category: "glasses",
        price: "14.96",
        photoURL:
          "https://m.media-amazon.com/images/I/61GJprnA3YL._UX569_.jpg",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProducts));

    const newProducts = await getProductsWithoutReviews();

    console.log("Products Created");
    console.log(newProducts);
    console.log("Finished creating products");
  } catch (error) {
    console.log("Error Creating Products");
    throw error;
  }
}

async function createInitalOrderDetails() {
  console.log("Starting to create order details");
  const [albert, sandra, glamgal, faker] = await getAllUsers();

  try {
    const orderDetailsToCreate = [
      { userId: albert.id, totalPrice: "5.99" },
      { userId: sandra.id, totalPrice: "20.99" },
      { userId: faker.id, totalPrice: "3.99" },
      { userId: glamgal.id, totalPrice: "3.99" },
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

  try {
    const orderLinesToCreate = [
      {
        orderId: 1,
        productId: 4,
        quantity: 3,
      },
      {
        orderId: 1,
        productId: 2,
        quantity: 1,
      },
      {
        orderId: 2,
        productId: 1,
        quantity: 2,
      },
      {
        orderId: 2,
        productId: 4,
        quantity: 3,
      },
      {
        orderId: 3,
        productId: 1,
        quantity: 3,
      },
      {
        orderId: 3,
        productId: 2,
        quantity: 3,
      },
      {
        orderId: 4,
        productId: 3,
        quantity: 1,
      },
      {
        orderId: 4,
        productId: 4,
        quantity: 2,
      },
    ];

    const OrderLines = await Promise.all(
      orderLinesToCreate.map(createOrderLine)
    );

    const fullOrders = await getFullOrders();

    console.log("Orders with lines created:");
    console.log("Full order details:", fullOrders);
    console.log("FullOrders[0].productDetails:", fullOrders[0].productDetails);
    console.log("Finished creating order lines!");
  } catch (error) {
    console.error("Error creating order lines!");
    throw error;
  }
}

async function createInitialPaymentDetails() {
  console.log("starting to create payment details");

  try {
    const paymentDetailsToCreate = [
      {
        amount: 2.0,
        orderId: 1,
        ccn: 133433453453453,
        cvc: 454,
        exp: "09/12/2040",
        billing: "123 E st",
        name: "Joe Shmoe",
        userId: 1,
      },

      {
        amount: 0.99,
        orderId: 2,
        ccn: 456786546786875,
        cvc: 454,
        exp: "09/12/2040",
        billing: "123 E st",
        name: "Joe Shmoe",
        userId: 2,
      },
      {
        amount: 20.0,
        orderId: 3,
        ccn: 867543567867544,
        cvc: 454,
        exp: "09/24/2030",
        billing: "123 E st",
        name: "Joe Shmoe",
        userId: 3,
      },
    ];

    const allPaymentDetails = await Promise.all(
      paymentDetailsToCreate.map(createPaymentDetails)
    );
    console.log("payment details created: ", allPaymentDetails);
  } catch (error) {
    console.error("error creating payment details");
    throw error;
  }
}

async function createInitialSessions() {
  console.log("Starting to create session details");
  const [albert, sandra, glamgal, faker] = await getAllUsers();

  try {
    const sessionsToCreate = [
      { userId: albert.id, totalPrice: "5.99" },
      { userId: sandra.id, totalPrice: "20.99" },
      { userId: faker.id, totalPrice: "3.99" },
      { userId: glamgal.id, totalPrice: "3.99" },
    ];
    // Revisit: add modifiedAt timestamps to above orderDetails
    const sessions = await Promise.all(sessionsToCreate.map(createSession));
    console.log("Session details created", sessions);
  } catch (error) {
    console.log("Error creating session details");
    throw error;
  }
}

async function createInitialCartItems() {
  console.log("Starting to create cart items.");

  try {
    const cartItemsToCreate = [
      {
        sessionId: 1,
        productId: 4,
        quantity: 3,
      },
      {
        sessionId: 1,
        productId: 2,
        quantity: 1,
      },
      {
        sessionId: 2,
        productId: 1,
        quantity: 2,
      },
      {
        sessionId: 2,
        productId: 4,
        quantity: 3,
      },
      {
        sessionId: 3,
        productId: 1,
        quantity: 3,
      },
      {
        sessionId: 3,
        productId: 2,
        quantity: 3,
      },
      {
        sessionId: 4,
        productId: 3,
        quantity: 1,
      },
      {
        sessionId: 4,
        productId: 4,
        quantity: 2,
      },
    ];

    const cartItems = await Promise.all(cartItemsToCreate.map(createCartItems));

    const fullCarts = await getFullCarts();

    console.log("cartItems: ", cartItems);
    console.log("carts with cartItems created:");
    console.log(fullCarts);
    console.log("FullCarts[0].productDetails:", fullCarts[0].productDetails);
    console.log("Finished creating cart items!");

    const something = await getCartItemsBySessionId(1);
    console.log("CartItems for sessionId 1:", something);
  } catch (error) {
    console.error("Error creating cart items!");
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
    await createInitialOrderLines();
    await createInitialPaymentDetails();
    await createInitialSessions();
    await createInitialCartItems();
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
