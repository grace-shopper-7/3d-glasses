import { useEffect } from "react";
import { useState } from "react";

const API_URL = "http://localhost:3000/api";

//GET
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products}`);
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

export const fetchCartBySession = async (sessionId) => {
  try {
    const response = await fetch(`${API_URL}/cartitems/${sessionId}`);
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

export const postItemToCart = async (body, sessionId) => {
  try {
    const response = await fetch(`${API_URL}/cartitems/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const postOrder = async () => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    return order;
  } catch (error) {
    throw error;
  }
};

export const postSession = async () => {
  try {
    const response = await fetch(`${API_URL / sessions}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return result;
  }
};

//Admin only
export const postProduct = async (body, token) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
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
//PATCH

//admin only
export const patchProduct = async (body, productId, token) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
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

export const patchUser = async (userId, token) => {
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
      method: "DELETE",
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

export const deleteCartItem = async (body, sessionId, productId) => {
  try {
    const response = await fetch(
      `${API_URL}/cartitems/${sessionId}/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
