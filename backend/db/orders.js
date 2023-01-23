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

// async function getAllOrders() {
//     try {
//         const {rows: []}
//     } catch (error) {
//         console.error("Error in getAllOrders:", error);
//         throw error;
//     }
// }

module.exports = {
    createOrderDetails,
}