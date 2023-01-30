const express = require('express');
const { createCartItems, updateCartItemsQuantity, deleteCartItem, getCartItemsBySessionId } = require('../db/cartItems');
const cartItemsRouter = express.Router();
const { requireUser } = require('./helpers');

cartItemsRouter.use((req, res, next) => {
    console.log("A request is being made to /cartItems.");
  next();
});

// POST /api/cartItems
cartItemsRouter.post('/', requireUser, async (req, res, next) => {
    const requestBody = req.body;
    
    try {
        const newCartItem = await createCartItems(requestBody);
        console.log(newCartItem);
        res.send(newCartItem);
    } catch ({name, message}) {
        next({name, message});
    }
})

// PATCH /api/cartItems/:cartItemId
cartItemsRouter.patch('/:cartItemId', requireUser, async (req, res, next) => {
    const updateFields = {id: req.params.cartItemId, ...req.body};

    try {
        const updatedCartItem = await updateCartItemsQuantity(updateFields);
        res.send(updatedCartItem);
    } catch ({name, message}) {
        next({name, message});
    }
})

// DELETE /api/cartItems/:cartItemId
cartItemsRouter.delete('/:cartItemId', requireUser, async (req, res, next) => {
    const cartItemId = req.params.cartItemId;

    try {
        const deletedCartItem = await deleteCartItem(cartItemId);
        res.send(deletedCartItem);
    } catch ({name, message}) {
        next({name, message});
    }
})

// GET /api/cartItems/:sessionId
cartItemsRouter.get('/:sessionId', requireUser, async (req, res, next) => {
    const sessionId = req.params.sessionId;

    try {
        const cartItems = await getCartItemsBySessionId(sessionId);
        res.send(cartItems);
    } catch ({name, message}) {
        next({name, message});
    }
})

// ROUTES GO HERE

cartItemsRouter.use((req, res, next) => {
    console.log("Now leaving /cartItems.");
  next();
});

module.exports = cartItemsRouter;
