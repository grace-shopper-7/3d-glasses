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

export const fetchDummyCartBySession = async (sessionId) => {
  const createCart = () => {
    let cart = [
      {
        id: 5,
        order_items: {
          id: 1,
          quantity: 2,
          product_details: {
            name: "Goofy Glasses",
            price: "$10.99",
          },
        },
      },
    ];
    createCart();
    return cart;
  };
};

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
