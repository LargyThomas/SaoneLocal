// require
const { connexion } = require('../../database/database');

// function

/**
* @description Get favorites product for a given user
* @param {string} usersId, the id of the user connected
* @return {array of hash} the information collected from the database
*/
const getFavoriteProductByUser = async (usersId) => {
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
* @description Get favorites producer for a given user
* @param {string} usersId, the id of the user connected
* @return {array of hash} the information collected from the database
*/
const getFavoriteProducerByUser = async (usersId) => {
    const result = await connexion.query(`
        SELECT p.*, s.usersFirstname, s.usersLastname, s.usersProfilPicture
        FROM favorite_producer fp 
        JOIN producer p ON p.producerId = fp.producerId 
        JOIN user_producer up ON up.producerId = p.producerId 
        JOIN users s ON s.usersEmail = up.usersId 
        WHERE fp.usersid = $1
    `,  [usersId]
    );

    return result.rows;
}

/**
* @description Add a product to favorites for the user connected
* @param {sting} usersId, the id of the user connected
* @param {int} productId, the id of the product to add in favorite
* @return @return {array of hash} or {Error} the information collected from the database or an error
*/
const createFavoriteProduct = async (usersId, productId) => {
    let exists = await connexion.query(`
        SELECT * 
        FROM favorite_product 
        WHERE usersId = $1 
        AND productId = $2
    `,  [usersId, productId]);

    if (exists.rows.length > 0) {
        throw new Error('ALREADY_FAVORITE');
    }

    exists = await connexion.query(`
        SELECT * 
        FROM product 
        WHERE productid = $1
    `,  [productId]);

    if (exists.rows.length == 0) {
        throw new Error('PRODUCT_NOT_FOUND');
    }

    await connexion.query(`
        INSERT INTO favorite_product (usersId, productId) 
        VALUES ($1, $2)
    `,  [usersId, productId]
    );
}

/**
* @description Remove a product from favorites for the user connected
* @param {sting} usersId, the id of the user connected
* @param {int} productId, the id of the product to add in favorite
* @return @return {array of hash} the information collected from the database
*/
const removeFavoriteProduct = async (usersId, productId) => {
    await connexion.query(`
        DELETE FROM favorite_product 
        WHERE usersId = $1 
        AND productId = $2
    `,  [usersId, productId]
    );
}

/**
* @description Add a producer to favorites for the user connected
* @param {sting} usersId, the id of the user connected
* @param {int} producerId, the id of the producer to add in favorite
* @return @return {array of hash} or {Error} the information collected from the database or an error
*/
const createFavoriteProducer = async (usersId, producerId) => {
    let exists = await connexion.query(`
        SELECT * 
        FROM favorite_producer  
        WHERE usersId = $1 
        AND producerId = $2
    `,  [usersId, producerId]);

    if (exists.rows.length > 0) {
        throw new Error('ALREADY_FAVORITE');
    }

    exists = await connexion.query(`
        SELECT * 
        FROM producer 
        WHERE producerId = $1
    `,  [producerId]);

    if (exists.rows.length == 0) {
        throw new Error('PRODUCER_NOT_FOUND');
    }

    await connexion.query(`
        INSERT INTO favorite_producer (usersId, producerId) 
        VALUES ($1, $2)
    `,  [usersId, producerId]
    );
}

/**
* @description Remove a producer from favorites for the user connected
* @param {sting} usersId, the id of the user connected
* @param {int} producerId, the id of the producer to add in favorite
* @return @return {array of hash} the information collected from the database
*/
const removeFavoriteProducer = async (usersId, producerId) => {
    await connexion.query(`
        DELETE FROM favorite_producer 
        WHERE usersId = $1 
        AND producerId = $2
    `,  [usersId, producerId]
    );
}

// export
module.exports = { getFavoriteProductByUser, getFavoriteProducerByUser, createFavoriteProduct, removeFavoriteProduct, createFavoriteProducer, removeFavoriteProducer };
