// require
const { connexion } = require('../../database/database');

// function

/**
* @description Get favorites for a given user
* @param {string} usersId, the id of the user connected
* @return {array of hash} the information collected from the database
*/
const getFavoriteByUser = async (usersId) => {
    const result = await connexion.query(`
        SELECT p.* 
        FROM favorite_product fp 
        JOIN product p ON p.productid = fp.productid 
        WHERE fp.usersid = $1
    `,  [usersId]
    );

    return result.rows;
}

/**
* @description Add a product to favorites for the user
* @param {sting} usersId, the id of the user connected
* @param {int} productId, the id of the product to add in favorite
* @return @return {array of hash} or {Error} the information collected from the database or an error
*/
const createFavorite = async (usersId, productId) => {
    const exists = await connexion.query(`
        SELECT * 
        FROM favorite_product 
        WHERE usersid = $1 
        AND productid = $2
    `,  [usersId, productId]);

    if (exists.rows.length > 0) {
        throw new Error('ALREADY_FAVORITE');
    }

    await connexion.query(`
        INSERT INTO favorite_product (usersid, productid) 
        VALUES ($1, $2)
    `,  [usersId, productId]
    );
}

/**
* @description Remove a product from favorites for the user
* @param {sting} usersId, the id of the user connected
* @param {int} productId, the id of the product to add in favorite
* @return @return {array of hash} the information collected from the database
*/
const removeFavorite = async (usersId, productId) => {
    await connexion.query(`
        DELETE FROM favorite_product 
        WHERE usersid = $1 
        AND productid = $2
    `,  [usersId, productId]
    );
}

// export
module.exports = { getFavoriteByUser, createFavorite, removeFavorite };
