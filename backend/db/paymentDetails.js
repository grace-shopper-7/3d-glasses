const client = require(`./client`);

async function createPaymentDetails({
  amount,
  orderId,
  ccn,
  cvc,
  exp,
  billing,
  name,
  userId,
}) {
  try {
    const {
      rows: [paymentDetails],
    } = await client.query(
      `
    INSERT INTO payment_details (amount,"orderId", ccn, cvc, exp, billing, name, "userId")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT ("orderId", "userId") DO NOTHING
    RETURNING *;
    `,
      [amount, orderId, ccn, cvc, exp, billing, name, userId]
    );
    return paymentDetails;
  } catch (error) {
    console.error("there was an error running payment details", error);
    throw error;
  }
}

module.exports = {
  createPaymentDetails,
};
