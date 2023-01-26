const client = require(`./client`);

async function createPaymentDetails ({amount, orderId, provider, status, userId}) {
  try {
    const {rows: [paymentDetails]} = await client.query (`
    INSERT INTO payment_details (amount,"orderId", provider, status, "userId")
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT ("orderId", "userId") DO NOTHING
    RETURNING *;
    `, [amount, orderId, provider, status, userId]);
    return paymentDetails;
  } catch (error) {
    console.error ('there was an error running payment details', error);
    throw error;
  }
}

module.exports = {
  createPaymentDetails
}