const express = require('express');
const cartRouter = express.Router();

// const { requireUser } = require('./utils');

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /activities.");

    next();
});

// POST /api/sessions

// PATCH /api/sessions/:sessionId

// GET /api/sessions/:userId * REQUIRES LOGIN

// DELETE /api/sessions/:userId * REQUIRES LOGIN (This route should only be used after 'Login / Continue as Guest' selection)

// MORE ROUTES GO HERE

cartRouter.use((req, res, next) => {
    console.log("Now leaving /activities.");

    next();
});

module.exports = cartRouter;