const express = require('express');
const { createSession, updateCart, getCartByUserId } = require('../db/cart');
const { requireUser } = require('./helpers');
const cartRouter = express.Router();

cartRouter.use((req, res, next) => {
    console.log("A request is being made to /sessions.");

    next();
});

// POST /api/sessions
cartRouter.post('/', requireUser, async (req, res, next) => {
    const userId = req.user.id;
    const startPrice = 0;

    try {
        const newCart = await createSession({userId, startPrice});
        res.send(newCart);
    } catch ({name, message}) {
        next({name, message});
    }
})

// PATCH /api/sessions/:sessionId
cartRouter.patch('/:sessionId', requireUser, async (req, res, next) => {
    const sessionId = req.params.sessionId;
    const newPrice = req.body.totalPrice;
    const fields = {totalPrice: newPrice, id: sessionId};

    try {
        const updatedCart = await updateCart(fields);
        res.send(updatedCart);
    } catch ({name, message}) {
        next({name, message});
    }
})

// GET /api/sessions/:userId * REQUIRES LOGIN
cartRouter.get('/:userId', requireUser, async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const userSession = await getCartByUserId(userId);
        res.send(userSession);
    } catch ({name, message}) {
        next({name, message});
    }
})

// MORE ROUTES GO HERE

cartRouter.use((req, res, next) => {
    console.log("Now leaving /sessions.");

    next();
});

module.exports = cartRouter;