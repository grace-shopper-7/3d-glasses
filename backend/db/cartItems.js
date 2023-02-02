const client = require("./client");

async function createCartItems({sessionId, productId, quantity}) {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
        INSERT INTO cart_items ("sessionId", "productId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [sessionId, productId, quantity]
    );
    return cartItems;
  } catch (error) {
    console.error("Error in createCartItems", error);
    throw error;
  }
}

async function getAllCartItems() {
  try {
    const { rows: cartItems } = await client.query(`
        SELECT *
        From cartItems
        
        `);
    return cartItems;
  } catch (error) {
    console.error("Error in getAllCartItems", error);
    throw error;
  }
}

async function getCartItemsBySessionId(sessionId) {
  try {
    const { rows: cartItems } = await client.query(`
      SELECT cart_items.*, products.name, products.price, products.sku, products."photoURL"
      FROM cart_items
      JOIN products ON products.id = cart_items."productId"
      WHERE "sessionId" = $1 AND products."category" = $2;
    `, [sessionId, "glasses"]);

    return cartItems;
  } catch (error) {
    console.error("Error in getCartItemsBySessionId", error);
    throw error;
  }
}

async function updateCartItemsQuantity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      const {
        rows: [updatedCartItems],
      } = await client.query(`
        UPDATE cart_items
        SET ${setString}
        WHERE id= ${id}
        RETURNING *;
      `, Object.values(fields));

      console.log("updateCartItemsQuantity db function:", updatedCartItems);

      return updatedCartItems;
    }
  } catch (error) {
    console.error("Error in updateCartItemsQuantity", error);
    throw error;
  }
}

async function deleteCartItem(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `DELETE FROM cart_items
    WHERE id= $1
    RETURNING *;`,
      [id]
    );
    return deleted;
  } catch (error) {
    console.error("Error in delete cart item", error);
    throw error;
  }
}

module.exports = {
  createCartItems,
  getAllCartItems,
  updateCartItemsQuantity,
  deleteCartItem,
  getCartItemsBySessionId
};
