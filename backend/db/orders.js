const client = require("./client");

async function createOrderDetails({ userId, amount }) {
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
      `
          INSERT INTO order_details( "userId", amount )
          VALUES ($1, $2)
          RETURNING *;
          `,
      [userId, amount]
    );

    return orderDetails;
  } catch (error) {
    console.error("Error in createOrderDetails", error);
    throw error;
  }
}

async function getFullOrders(userId) {
  try {
    const { rows: orders } = await client.query(`
          SELECT order_details.*, users.username AS "username"
          FROM order_details
          JOIN users ON order_details."userId" = users.id;
        `);
    const { rows: orderLines } = await client.query(`
          SELECT order_lines.*, products.id AS "productId", products.name, products.price, products.sku, products."photoURL"
          FROM order_lines
          JOIN products ON products.id = order_lines."productId";
        `);

    for (const order of orders) {
      const orderLineToAdd = orderLines.filter(
        (orderLine) => orderLine.orderId === order.id
      );

      order.productDetails = orderLineToAdd;
    }
    // const filteredOrders = orders.filter((order) => order.userId === userId);

    return orders;
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    throw error;
  }
}

async function getOrdersByUserId(userId) {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT *
        FROM order_details
        WHERE "userId" = ($1);
      `,
      [userId]
    );
    return orders;
  } catch (error) {
    console.error("Error in getOrdersByUserId:", error);
    throw error;
  }
}

async function getOrdersById(orderId) {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT *
        FROM order_details
        WHERE id = $1;
        `,
      [orderId]
    );
    return orders;
  } catch (error) {
    console.error("Error in getOrdersByUserId:", error);
    throw error;
  }
}

module.exports = {
  createOrderDetails,
  getFullOrders,
  getOrdersByUserId,
  getOrdersById,
};
