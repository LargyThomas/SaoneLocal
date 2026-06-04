const { connexion } = require('../../database/database');

// Get favorites for a given user (returns full product rows)
const getFavoritesByUser = async (usersId) => {
    const result = await connexion.query(
        `SELECT p.* FROM favorite_product fp
         JOIN product p ON p.productid = fp.productid
         WHERE fp.usersid = $1`,
        [usersId]
    );
    return result.rows;
}

// Add a product to favorites for the user
const addFavorite = async (usersId, productId) => {
    // Check if already favorited
    const exists = await connexion.query(
        'SELECT * FROM favorite_product WHERE usersid = $1 AND productid = $2',
        [usersId, productId]
    );
    if (exists.rows.length > 0) {
        throw new Error('ALREADY_FAVORITE');
    }

    await connexion.query(
        'INSERT INTO favorite_product (usersid, productid) VALUES ($1, $2)',
        [usersId, productId]
    );
}

// Remove a product from favorites for the user
const removeFavorite = async (usersId, productId) => {
    await connexion.query(
        'DELETE FROM favorite_product WHERE usersid = $1 AND productid = $2',
        [usersId, productId]
    );
}

module.exports = { getFavoritesByUser, addFavorite, removeFavorite };
