const client = require("./client");

async function createSession({ userId, totalPrice }) {
  try {
    const {
      rows: [session],
    } = await client.query(
      `
    INSERT INTO session ("userId", "totalPrice")
    VALUES ($1, $2)
    RETURNING *;
    `,
      [userId, totalPrice]
    );
    return session;
  } catch (error) {
    console.error("error in create session", error);
    throw error;
  }
}

async function getCartBySessionId(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      SELECT * FROM sessions
      WHERE id= $1
      `,
      [id]
    );
    if (!cart) {
      return null;
    }
  } catch (err) {
    throw err;
  }
}

async function getFullCarts() {
  try {
    const { rows: carts } = await client.query(`
    SELECT session.*, users.username as "username"
    FROM session
    JOIN users on session."userId" = users.id;
    `);
    const { rows: cartItems } = await client.query(`
    SELECT cart_items.*, products.id AS "productId", products.name, products.price, products.sku, products."photoURL"
    FROM cart_items
    JOIN products ON products.id = cart_items."productId";
    `);
    for (const cart of carts) {
      const cartItemToAdd = cartItems.filter(
        (cartItem) => cartItem.sessionId === cart.id
      );
      cart.productDetails = cartItemToAdd;
    }
    return carts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCart({ totalPrice, id }) {
  try {
    const {
      rows: [updatedCart],
    } = await client.query(
      `UPDATE session
      SET "totalPrice" = ($1)
      WHERE id= ${id}
      RETURNING *;`,
      [totalPrice]
    );

    return updatedCart;
  } catch (error) {
    console.error("Error in updateCart", error);
    throw error;
  }
}

async function deleteCart(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `DELETE FROM session
    WHERE id= $1
    RETURNING *;`,
      [id]
    );
    return deleted;
  } catch (error) {
    console.error("Error in deleteCart", error);
    throw error;
  }
}

module.exports = {
  createSession,
  getCartBySessionId,
  getFullCarts,
  updateCart,
  deleteCart,
};
