const client = require("./client");

async function createProducts({
  name,
  description,
  SKU,
  category,
  price,
  photoURL,
}) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
          INSERT INTO products( name, description, SKU, category, price, photoURL )
          VALUES ($1, $2, $3, $4, $5, $6 )
          ON CONFLICT (name) DO NOTHING
          RETURNING *;
          `,
      [name, description, SKU, category, price, photoURL]
    );

    // console.log("This is a user ------------>", user);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT * 
        FROM products
        WHERE id = $1;
        `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getProductsWithoutReviews() {
  try {
    const {
      rows: [products],
    } = await client.query(`
        SEELCT * 
        FROM products;
        `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
        SELECT *
        From products
        JOIN reviews ON products.id = reviews."productId";
        `);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProducts,
  getProductById,
  getProductsWithoutReviews,
  getAllProducts,
};
