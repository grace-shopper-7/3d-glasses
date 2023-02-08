const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");
const { JWT_SECRET } = process.env;

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  console.log("auth in auth", auth);

  try {
    if (!auth) {
      console.log("No auth, moving to next.");
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        // console.log("Authorization successful. Moving to next.");
        next();
      }
    } else {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});

// ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);

// ROUTER: /api/products
const productsRouter = require("./products");
router.use("/products", productsRouter);

// ROUTER: /api/orderDetails
const orderDetailsRouter = require("./orders");
router.use("/orderdetails", orderDetailsRouter);

// ROUTER: /api/paymentDetails
const paymentDetailsRouter = require("./payment");
router.use("/paymentdetails", paymentDetailsRouter);

// ROUTER: /api/orderLines
const orderLinesRouter = require("./orderLines");
router.use("/orderlines", orderLinesRouter);

// ROUTER: /api/session
const sessionRouter = require("./cart");
router.use("/sessions", sessionRouter);

// ROUTER: /api/cartItems
const cartItemsRouter = require("./cartItems");
router.use("/cartitems", cartItemsRouter);

// ROUTER: /api/reviews
const reviewsRouter = require("./reviews");
router.use("/reviews", reviewsRouter);

// router.use((error, req, res, next) => {
//   res.send({
//     error: "ERROR",
//     name: error.name,
//     message: error.message,
//   });
// });

module.exports = router;
