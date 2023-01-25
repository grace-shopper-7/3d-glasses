const client = require("./client");

async function createOrderDetails({
  userId,
  totalPrice
}) {
  try {
    const {
      rows: [orderDetails],
    } = await client.query(
      `
          INSERT INTO order_details( "userId", "totalPrice" )
          VALUES ($1, $2)
          RETURNING *;
          `,
      [userId, totalPrice]
    );

    return orderDetails;
  } catch (error) {
    console.error("Error in createOrderDetails", error);
    throw error
  }
}

async function getAllOrders() {
    try {
        const { rows } = await client.query(`
          SELECT *
          FROM order_details;
        `);
        return rows;
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        throw error;
    }
}

async function getOrdersByUserId(userId) {
  try {
      const { rows: [ orders ] } = await client.query(`
        SELECT *
        FROM order_details
        WHERE "userId" = $1;
      `, [userId]);
      return orders;
  } catch (error) {
      console.error("Error in getOrdersByUserId:", error);
      throw error;
  }
}

async function getOrdersById(orderId) {
  try {
      const { rows: [ orders ] } = await client.query(`
        SELECT *
        FROM order_details
        WHERE id = $1;
      `, [orderId]);
      return orders;
  } catch (error) {
      console.error("Error in getOrdersByUserId:", error);
      throw error;
  }
}

module.exports = {
    createOrderDetails,
    getAllOrders,
    getOrdersByUserId,
    getOrdersById
}