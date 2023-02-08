import { useEffect } from "react";
import { useState } from "react";

const API_URL = `/api`;

//GET
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    const products = await response.json();
    console.log(products);
    return products;
  } catch (error) {
    throw error;
  }
};

export const fetchOrdersByUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/orderdetails/${userId}`, {
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

export const fetchFullOrdersByUser = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/orderdetails/history/${userId}`, {
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

export const fetchOrderLinesByOrderId = async (orderId, token) => {
  try {
    const response = await fetch(`${API_URL}/orderlines/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const orderLines = await response.json();
    return orderLines;
  } catch (error) {
    console.log("Error fetching order lines:", error);
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

export const fetchSessionByUser = async (userId, token) => {
  console.log("userid and token", userId, token);
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

export const fetchUsers = async (token) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    for (const user of result) {
      delete user.password;
    }

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
        orderId: orderId,
        productId: productId,
        quantity: quantity,
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
        name: `${name}`,
        description: `${desc}`,
        sku: `${sku}`,
        category: "glasses",
        price: `${price}`,
        photoURL: `${photoURL}`,
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
export const patchProduct = async (
  productId,
  name,
  desc,
  price,
  photoURL,
  token
) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: `${name}`,
        description: `${desc}`,
        price: `${price}`,
        photoURL: `${photoURL}`,
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

export const patchUser = async (
  firstName,
  lastName,
  address,
  telephone,
  userId,
  token
) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        address: `${address}`,
        telephone: `${telephone}`,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error in patchUser: ", error);
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
        category: "deleted",
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
    const response = await fetch(`${API_URL}/cartitems/${cartItemId}`, {
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
