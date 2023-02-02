const express = require("express");
const orderDetailsRouter = express.Router();
const { createOrderDetails, getOrdersByUserId } = require("../db/orders");
const { requireUser } = require("./helpers");

orderDetailsRouter.use((req, res, next) => {
  console.log("A request is being made to /orders.");

  next();
});

// POST /api/orderdetails
orderDetailsRouter.post("/", requireUser, async (req, res, next) => {
  const userId = req.user.id;
  const amount = req.body.amount;
  console.log("userId", "amount", userId, amount);

  try {
    const newOrder = await createOrderDetails({ userId, amount });
    res.send(newOrder);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/orderdetails/:userId * REQUIRES LOGIN
orderDetailsRouter.get("/:userId", requireUser, async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const userOrders = await getOrdersByUserId(userId);
    res.send(userOrders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// // PATCH /api/sessions/:sessionId
// orderDetailsRouter.patch('/:sessionId', requireUser, async (req, res, next) => {
//   const sessionId = req.params.sessionId;
//   const newOrder = req.body.amount;
//   const fields = {amount: newOrder, id: sessionId};

//   try {
//       const updatedOrder = await updatedOrder(fields);
//       res.send(updatedCart);
//   } catch ({name, message}) {
//       next({name, message});
//   }
// })

// ROUTES GO HERE

orderDetailsRouter.use((req, res, next) => {
  console.log("Now leaving /orders.");

  next();
});

module.exports = orderDetailsRouter;
