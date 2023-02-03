const express = require("express");
const orderLinesRouter = express.Router();
const { requireUser } = require("./helpers");
const {
  createOrderLine,
  updateOrderLineQuantity,
  getOrderLinesByOrderId,
} = require("../db/orderItems");

orderLinesRouter.use((req, res, next) => {
  console.log("A request is being made to /orderLines.");
  next();
});

// POST /api/orderlines
orderLinesRouter.post("/", requireUser, async (req, res, next) => {
  const requestBody = req.body;

  try {
    const newOrderLine = await createOrderLine(requestBody);
    console.log(newOrderLine);
    res.send(newOrderLine);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/orderlines/:orderId
orderLinesRouter.get("/:orderId", requireUser, async (req, res, next) => {
  const orderId = req.params.orderId;
  console.log(orderId, "orderId Here");

  try {
    const orderLines = await getOrderLinesByOrderId(orderId);
    res.send(orderLines);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = orderLinesRouter;
