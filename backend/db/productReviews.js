const client = require("./client");


async function createReview(userId, productId, tile, content) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
        INSERT INTO reviews ("userId", "productId", title, content)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [userId, productId, tile, content]
    );
    return reviews;
  } catch (error) {
    console.error("Error in createReview", error);
    throw error
  }
}


async function getRewiewsByProductId(productId) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
        SELECT * 
        FROM reviews
        WHERE productId = $1;
        `,
      [productId]
    );
    return reviews;
  } catch (error) {
    console.error("Error in getReviewsByProductId", error);
    throw error
  }
}

async function getRewiewsByUserId(userId) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
        SELECT * 
        FROM reviews
        WHERE userId = $1;
        `,
      [userId]
    );
    return reviews;
  } catch (error) {
    console.error("Error in getRewiewsByUserId", error);
    throw error
  }
}




async function updateReview({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    if (setString.length > 0) {
      const {
        rows: [updatedReview],
      } = await client.query(
        `UPDATE reviews
      SET ${setString}
      WHERE id= ${id}
      RETURNING *;`,
        Object.values(fields)
      );

      return updatedReview;
    }
  } catch (error) {
    console.error("Error in updateReview", error);
    throw error
  }
}


async function deleteReview(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `DELETE FROM routine_activities
    WHERE id= $1
    RETURNING *;`,
      [id]
    );
    return deleted;
  } catch (error) {
    console.error("Error in deleteRewiew", error);
    throw error
  }
}


module.exports = {
createReview,
getRewiewsByProductId,
deleteReview,
updateReview, 
getRewiewsByUserId
}