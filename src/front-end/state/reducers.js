//userInitState
export const userInitState = {
  user: JSON.parse(window.localStorage.getItem("user")),
  token: window.localStorage.getItem("token"),
};
//productsInitState
export const productsInitState = {
  products: [],
  reviews: [],
};

//cartInitState
export const cartInitState = {
  cart: [],
  itemCount: 0
};

//ordersInitState
export const ordersInitState = {
  orders: [],
  lines: [],
};

//reducers

export const productReducer = (draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case "populate_products":
      draft.products = payload;
      break;
    case "add_product":
      draft.products.push(payload);
      break;
    case "remove_product":
      draft.products = draft.products.filter(
        (product) => product.id !== payload
      );
      break;
    case "add_review":
      const product = draft.products.find(
        (product) => product.id === payload.productId
      );
      product.reviews.push(payload.review);
      break;
    case "remove_review":
      const otherProduct = draft.products.find(
        (product) => product.id === payload.productId
      );

      otherProduct.reviews = otherProduct.reviews.filter(
        (review) => review.id !== payload.reviewId
      );
      break;
    default:
      throw new Error(`No case for type ${type} found in productReducer.`);
  }
};

// Revisit: Add case for adjusting quantity of specific item(s) in cart
export const cartReducer = (draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case "add_item_to_cart":
      draft.cart.push(payload);
      draft.itemCount += payload.qty;
      break;
    case "remove_item_from_cart":
      draft.cart = draft.cart.filter((cartItem) => cartItem.id !== payload.id);
      draft.itemCount -= payload.qty;
      break;
    default:
      throw new Error(`No case for type ${type} found in cartReducer.`);
  }
};

export const orderReducer = (draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case "populate_orders":
      draft.orders = payload;
      break;
    case "place_order":
      draft.orders.push(payload);
      break;
    case "populate_order_lines":
      draft.lines = payload;
      break;
    default:
      throw new Error(`No case for type ${type} found in orderReducer.`);
  }
};

export const userReducer = (draft, action) => {
  const { type, payload } = action;
  switch (type) {
    case "set_user":
      draft.user = payload;
      break;
    case "set_token":
      draft.token = payload;
      break;
    default:
      throw new Error(`No case for type ${type} found in userReducer.`);
  }
};
