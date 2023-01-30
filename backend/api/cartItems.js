const express = require("express");
const router = require("../../../UNIV_FitnessTrackr_Starter/api/routines");
const { getCartBySessionId } = require("../db/cart");
const { createCartItems } = require("../db/cartitems");
const cartItemsRouter = express.Router();

// const { requireUser } = require('./utils');

cartItemsRouter.use((req, res, next) => {
  console.log("A request is being made to /activities.");

  next();
});

// POST /api/cartItems/:sessionId
router.post("/:sessionId", async (req, res, next) => {
  const sessionId = req.params.sessionId;
  const cartItemObj = {
    sessionId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  const newCartItem = await createCartItems(cartItemObj);
  res.send(newCartItem);
});
// PATCH /api/cartItems/:cartItemId

// DELETE /api/cartItems/:cartItemId

// GET /api/cartItems/:sessionId

// ROUTES GO HERE

cartItemsRouter.use((req, res, next) => {
  console.log("Now leaving /activities.");

  next();
});

module.exports = cartItemsRouter;
