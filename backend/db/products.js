const client = require("./client");

async function createProducts({
  name,
  description,
  sku,
  category,
  price,
  photoURL,
}) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
          INSERT INTO products( name, description, sku, category, price, "photoURL" )
          VALUES ($1, $2, $3, $4, $5, $6 )
          ON CONFLICT (name) DO NOTHING
          RETURNING *;
          `,
      [name, description, sku, category, price, photoURL]
    );

    // console.log("This is a user ------------>", user);
    return products;
  } catch (error) {
    console.error("Error in createProducts", error);
    throw error
  }
}

// Revisit: look into appending reviews once implemented
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

// Revisit: look into reducing sent information for bulk product listings
async function getProductsWithoutReviews() {
  try {
    const { rows } = await client.query(`
      SELECT * 
      FROM products
      WHERE "category"=$1;
    `, ["glasses"]);

    return rows;
  } catch (error) {
    console.error("Error in getRewiewsWithoutReviews", error);
    throw error
  }
}

// Revisit: look into reducing sent information for bulk product listings
async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT *
        From products
        JOIN reviews ON products.id = reviews."productId";
        `);
      return rows;
  } catch (error) {
    console.error("Error in getAllProducts", error);
    throw error
  }
}

// revisit to inquire on range of prices
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

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      const {
        rows: [updatedProduct],
      } = await client.query(
        `UPDATE products
      SET ${setString}
      WHERE id= ${id}
      RETURNING *;`,
        Object.values(fields)
      );

      return updatedProduct;
    }
  } catch (error) {
    console.error("Error in updateProduct", error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `DELETE FROM products
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
  updateProduct,
  deleteProduct,
};
