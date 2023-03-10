const client = require("./client");

async function createOrderLine({ orderId, productId, quantity }) {
  try {
    const {
      rows: [orderLine],
    } = await client.query(
      `
            INSERT INTO order_lines("orderId", "productId", quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT ("productId", "orderId", id) DO NOTHING
            RETURNING *;
        `,
      [orderId, productId, quantity]
    );

    return orderLine;
  } catch (error) {
    console.error("There was an error during createOrderLine:", error);
    throw error;
  }
}

async function getOrderLinesByOrderId(orderId) {
  try {
    const { rows: orderLines } = await client.query(
      `
      SELECT order_lines.*, products.id AS "productId", products.name, products.price, products.sku, products."photoURL"
      FROM order_lines
      JOIN products ON products.id = order_lines."productId"
      WHERE "orderId" = $1;
    `,
      [orderId]
    );
    return orderLines;
  } catch (error) {
    console.error("There was an error in getOrderLinesByOrderId", error);
    throw error;
  }
}

module.exports = {
  createOrderLine,
  getOrderLinesByOrderId,
};
