const client = require("./client");

async function createOrderLine({orderId, productId, quantity}) {
    try {
        const {rows: [orderLine]} = await client.query(`
            INSERT INTO order_lines("orderId", "productId", quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT ("productId", "orderId") DO NOTHING
            RETURNING *;
        `, [orderId, productId, quantity]);

        return orderLine;
    } catch (error) {
        console.error("There was an error during createOrderLine:", error);
        throw error;
    }
}

module.exports = {
    createOrderLine,
};