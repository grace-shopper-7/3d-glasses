const express = require("express");
const { createPaymentDetails } = require("../db/paymentDetails");
const paymentDetailsRouter = express.Router();

// const { requireUser } = require('./utils');
// const { requireAdmin } = require('./utils');

paymentDetailsRouter.use((req, res, next) => {
  console.log("A request is being made to /payment.");

  next();
});

// ROUTES GO HERE
//------------------------------------------------------------------------
// POST /api/payment
paymentDetailsRouter.post("/", async (req, res, next) => {
  const paymentFields = req.body;

  try {
    const newPayment = await createPaymentDetails(paymentFields);
    res.send(newPayment);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = paymentDetailsRouter;
