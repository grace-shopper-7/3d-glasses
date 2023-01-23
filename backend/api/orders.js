const express = require('express');
const ordersRouter = express.Router();

// const { requireUser } = require('./utils');

ordersRouter.use((req, res, next) => {
    console.log("A request is being made to /activities.");

    next();
});

// ROUTES GO HERE

ordersRouter.use((req, res, next) => {
    console.log("Now leaving /activities.");

    next();
});

module.exports = ordersRouter;