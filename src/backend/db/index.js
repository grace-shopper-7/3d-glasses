module.exports = {
  ...require("./cart"), // adds key/values from cart.js
  ...require("./cartitems"), // adds key/values from cartitems.js
  ...require("./client"), // adds key/values from client.js
  ...require("./orders"), // adds key/values from orders.js
  ...require("./productReviews"), // adds key/values from productReviews.js
  ...require("./products"), // adds key/values from products.js
  ...require("./users"), // adds key/values from users.js
};
