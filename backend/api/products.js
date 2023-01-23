const express = require('express');
const productsRouter = express.Router();

// const { requireUser } = require('./utils');
// const { requireAdmin } = require('./utils');

productsRouter.use((req, res, next) => {
    console.log("A request is being made to /activities.");

    next();
});

// ROUTES GO HERE

// POST /api/products/ ** ADMIN ONLY

// PATCH /api/products/:productId ** ADMIN ONLY

// DELETE /api/products/:productId ** ADMIN ONLY

// GET /api/products

// GET /api/products/:productId

productsRouter.use((req, res, next) => {
    console.log("Now leaving /activities.");

    next();
});

module.exports = productsRouter;