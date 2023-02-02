import { useEffect } from "react";
import { useState } from "react";

const PORT = 3000;
const API_URL = `http://localhost:${PORT}/api`;

//GET
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products/`);
    const products = await response.json();
    return products;
  } catch (error) {
    throw error;
  }
};

export function fetchDummyProducts() {
  let products = [
    {
      id: 1,
      quantity: 2,
      details: {
        name: "Goofy Glasses",
        price: 10.99,
        description: "The goofiest damn glasses you've ever seen",
        photoURL:
          "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
      },
    },
    {
      id: 2,
      quantity: 2,
      details: {
        name: "Glass Glasses",
        price: 600,
        description: "Glasses 3D printed out of glass",
        photoURL:
          "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
      },
    },
    {
      id: 3,
      quantity: 4,
      details: {
        name: "g g g g g glases",
        price: 2,
        description: "Trash glasses",
        photoURL:
          "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
      },
    },
  ];
  console.log("THESE ARE THE PRODUCTS", products);
  return products;
}

export const fetchOrdersByUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/orders/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const orders = await response.json();
    return orders;
  } catch (error) {
    throw error;
  }
};

export const fetchReviewsByProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/reviews`);
    const reviews = await response.json();
    return reviews;
  } catch (error) {
    throw error;
  }
};

export const fetchCartBySession = async (sessionId, token) => {
  try {
    const response = await fetch(`${API_URL}/cartItems/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const cart = await response.json();
    return cart;
  } catch (error) {
    throw error;
  }
};

export function fetchDummyCartBySession() {
  // const [total, setTotal] = useState(0.0);
  // useEffect(() => {
  //   const newTotal = cart.order_items.reduce((accumulator, object) => {
  //     return accumulator + object.price;
  //   }, 0);
  //   setTotal(newTotal);
  // }, cart.order_items);
  let cart = {
    id: 5,
    order_items: [
      {
        id: 1,
        quantity: 2,
        details: {
          name: "Goofy Glasses",
          price: 10.99,
          description: "The goofiest damn glasses you've ever seen",
          photoURL:
            "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
        },
      },
      {
        id: 2,
        quantity: 2,
        details: {
          name: "Glass Glasses",
          price: 600,
          description: "Glasses 3D printed out of glass",
          photoURL:
            "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
        },
      },
      {
        id: 3,
        quantity: 4,
        details: {
          name: "g g g g g glases",
          price: 2,
          description: "Trash glasses",
          photoURL:
            "http://cdn.shopify.com/s/files/1/2633/2144/products/caddis-life-readers-porgy-backstage-reading-glasses-gloss-black-readers-0-00-blue-light-reading-glasses-31051380359356.jpg?v=1660783260",
        },
      },
    ],
  };
  console.log(cart);
  return cart;
}

export const fetchSessionByUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/sessions/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

//POST
export const postReviewToProduct = async (body, productId, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const postItemToCart = async (token, sessionId, productId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/cartitems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        sessionId: sessionId,
        productId: productId,
        quantity: quantity,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const postPaymentDetails = async (
  token,
  amount,
  orderId,
  ccn,
  cvc,
  exp,
  billing,
  name,
  userId
) => {
  try {
    const response = await fetch(`${API_URL}/paymentdetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: amount,
        orderId: orderId,
        ccn: ccn,
        cvc: cvc,
        exp: exp,
        billing: billing,
        name: name,
        userId: userId,
      }),
    });
    const paymentDeets = await response.json();
    return paymentDeets;
  } catch (error) {
    throw error;
  }
};

export const postOrder = async (token, userId, amount) => {
  try {
    const response = await fetch(`${API_URL}/orderdetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: userId,
        amount: amount,
      }),
    });
    const order = await response.json();
    return order;
  } catch (error) {
    throw error;
  }
};

export const postOrderLine = async (token, orderId, productId, quantity) => {
  try {
    const response = await fetch(`${API_URL}/orderlines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId,
        productId,
        quantity,
      }),
    });
    const orderLine = await response.json();
    return orderLine;
  } catch (error) {
    throw error;
  }
};

export const postSession = async (token) => {
  try {
    const response = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return result;
  }
};

//Admin only
export const postProduct = async (name, desc, sku, price, photoURL, token) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "name": `${name}`,
        "description": `${desc}`,
        "sku": `${sku}`,
        "category": 'glasses',
        "price": `${price}`,
        "photoURL": `${photoURL}`
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
//PATCH

//admin only
export const patchProduct = async (productId, name, desc, price, photoURL, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "name": `${name}`,
        "description": `${desc}`,
        "price": `${price}`,
        "photoURL": `${photoURL}`
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const patchSession = async (sessionId, token) => {
  try {
    const response = await fetch(`${API_URL}/sessions/${sessionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const patchCartItem = async (newQty, cartItemId, token) => {
  try {
    const response = await fetch(`${API_URL}/cartItems/${cartItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: `${newQty}`,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const patchUser = async (body, userId, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

//DELETE

//admin only
export const deleteProduct = async (productId, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "category": "deleted"
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteReview = async (body, productId, reviewId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/products/${productId}/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const deleteCartItem = async (token, cartItemId) => {
  try {
    const response = await fetch(
      `${API_URL}/cartitems/${cartItemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
