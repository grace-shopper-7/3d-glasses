const express = require('express');
const cartItemsRouter = express.Router();

// const { requireUser } = require('./utils');

cartItemsRouter.use((req, res, next) => {
    console.log("A request is being made to /activities.");

    next();
});

// POST /api/cartItems

// PATCH /api/cartItems/:cartItemId

// DELETE /api/cartItems/:cartItemId

// GET /api/cartItems

// ROUTES GO HERE

cartItemsRouter.use((req, res, next) => {
    console.log("Now leaving /activities.");

    next();
});

module.exports = cartItemsRouter;