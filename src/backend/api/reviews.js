const express = require('express');
const reviewsRouter = express.Router();

// const { requireUser } = require('./utils');

reviewsRouter.use((req, res, next) => {
    console.log("A request is being made to /activities.");

    next();
});

// ROUTES GO HERE

reviewsRouter.use((req, res, next) => {
    console.log("Now leaving /activities.");

    next();
});

module.exports = reviewsRouter;