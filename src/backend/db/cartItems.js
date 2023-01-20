const client = require("./client");

async function createCartItems( sessionId, productId, quantity) {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
        INSERT INTO reviews ("sessionId", "productId", quantity)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
      [sessionId, productId, quantity]
    );
    return cartItems;
  } catch (error) {
    console.error("Error in createCartItems", error);
    throw error
  }
}


async function getAllCartItems() {
  try {
    const { rows: cartItems } = await client.query(`
        SELECT *
        From cartItems
        
        `);
    return cartItems    
  } catch (error) {
    console.error("Error in getAllCartItems", error);
    throw error
  }
}

async function updateCartItemsQuantity({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      const {
        rows: [updatedCartItemsQuantity],
      } = await client.query(
        `UPDATE cartItems
      SET ${setString}
      WHERE id= ${id}
      RETURNING *;`,
        Object.values(fields)
      );

      return updatedCartItemsQuantity;
    }
  } catch (error) {
    console.error("Error in updateCartItemsQuantity", error);
    throw error
  }
}

async function deleteCartItem(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `DELETE FROM cartItems
    WHERE id= $1
    RETURNING *;`,
      [id]
    );
    return deleted;
  } catch (error) {
    console.error("Error in delete cart item", error);
    throw error
  }
}

module.exports = {
  createCartItems,
  getAllCartItems,
  updateCartItemsQuantity,
  deleteCartItem
}