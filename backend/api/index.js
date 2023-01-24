const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');
const { JWT_SECRET } = process.env;

router.use(async (req, res, next)=> {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        console.log("No auth, moving to next.");
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                // console.log("Authorization successful. Moving to next.");
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`,
        });
    }
});

router.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }

    next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
router.use('/products', productsRouter);

// ROUTER: /api/orderDetails
const orderDetailsRouter = require('./orderDetails');
router.use('/orderDetails', orderDetailsRouter);

// ROUTER: /api/paymentDetails
const paymentDetailsRouter = require('./paymentDetails');
router.use('/paymentDetails', paymentDetailsRouter);

// ROUTER: /api/orderLines
const orderLinesRouter = require('./orderLines');
router.use('/orderLines', orderLinesRouter);

// ROUTER: /api/session
const sessionRouter = require('./session');
router.use('/session', sessionRouter);

// ROUTER: /api/cartItems
const cartItemsRouter = require('./cartItems');
router.use('/cartItems', cartItemsRouter);

router.use((error, req, res, next) => {
    res.send({
        error: "ERROR",
        name: error.name,
        message: error.message
    });
});

module.exports = router;