const express = require('express');
const orderDetailsRouter = express.Router();
const {createOrderDetails, getOrdersByUserId} = require ('../db/orders')
const { requireUser } = require('./helpers');

orderDetailsRouter.use((req, res, next) => {
    console.log("A request is being made to /orders.");

    next();
});

// POST /api/sessions
orderDetailsRouter.post('/', requireUser, async (req, res, next) => {
  const userId = req.user.id;
  const totalPrice = req.body.totalPrice;
  console.log('userId', 'totalPrice', userId, totalPrice)

  try {
      const newOrder = await createOrderDetails({userId, totalPrice});
      res.send(newOrder);
  } catch ({name, message}) {
      next({name, message});
  }
})

// GET /api/sessions/:userId * REQUIRES LOGIN
orderDetailsRouter.get('/:userId', requireUser, async (req, res, next) => {
  const userId = req.params.userId;

  try {
      const userOrders = await getOrdersByUserId(userId);
      res.send(userOrders);
  } catch ({name, message}) {
      next({name, message});
  }
})

// // PATCH /api/sessions/:sessionId
// orderDetailsRouter.patch('/:sessionId', requireUser, async (req, res, next) => {
//   const sessionId = req.params.sessionId;
//   const newOrder = req.body.totalPrice;
//   const fields = {totalPrice: newOrder, id: sessionId};

//   try {
//       const updatedOrder = await updatedOrder(fields);
//       res.send(updatedCart);
//   } catch ({name, message}) {
//       next({name, message});
//   }
// })

// ROUTES GO HERE

orderDetailsRouter.use((req, res, next) => {
    console.log("Now leaving /orders.");

    next();
});



module.exports = orderDetailsRouter;