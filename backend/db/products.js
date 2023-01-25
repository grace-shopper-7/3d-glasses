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
          INSERT INTO products( name, description, SKU, category, price, "photoURL" )
          VALUES ($1, $2, $3, $4, $5, $6 )
          ON CONFLICT (name) DO NOTHING
          RETURNING *;
          `,
      [name, description, SKU, category, price, photoURL]
    );

    // console.log("This is a user ------------>", user);
    return products;
  } catch (error) {
    console.error("Error in createProducts", error);
    throw error
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
    console.error("Error in getProductById", error);
    throw error
  }
}

async function getProductsWithoutReviews() {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM products;
    `);
    
    return rows;
  } catch (error) {
    console.error("Error in getRewiewsWithoutReviews", error);
    throw error
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
    console.error("Error in getAllProducts", error);
    throw error
  }
}

async function getProductsByPrice(price) {
  try {
    const { rows: products } = await client.query(`
        SELECT *
        From products
        WHERE price = $1
        `, [price]);
    return products
  } catch (error) {
    console.error("Error in getProductsByPrice", error);
    throw error
  }
}

async function getProductsByCategory(category) {
  try {
    const { rows: products } = await client.query(`
        SELECT *
        From products
        WHERE category = $1
        `, [category]);
    return products
  } catch (error) {
    console.error("Error in getProductsByCategory", error);
    throw error
  }
}

async function deleteProduct(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `DELETE FROM product
    WHERE id= $1
    RETURNING *;`,
      [id]
    );
    return deleted;
  } catch (error) {
    console.error("Error in deleteProducts", error);
    throw error
  }
}


module.exports = {
  createProducts,
  getProductById,
  getProductsWithoutReviews,
  getAllProducts,
  getProductsByPrice,
  getProductsByCategory, 
  deleteProduct,
};
