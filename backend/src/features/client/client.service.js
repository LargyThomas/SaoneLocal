// require
const { connexion } = require('../../database/database.js')

// function

/**
* @description find the information of the connected client
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
findProfilUser = async (req, res) => {
    const result = await connexion.query(`
        SELECT users.usersFirstname, users.usersLastname, users.usersGender, users.usersCreationDate, users.usersProfilPicture 
        FROM users 
        WHERE users.usersEmail = $1
    `,  [req.user.email])

    return result.rows
}

/**
* @description find the basket of the connected client
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
findProfilBasket = async (req, res) => {
    const result = await connexion.query(`
        SELECT product.productId, product.productName, product.productPicture, basket_items.basketItemsQuantity, basket_items.basketItemsTotalCost 
        FROM basket_items 
        JOIN product ON basket_items.productId = product.productId 
        WHERE basket_items.usersId = $1
    `,  [req.user.email])

    return result.rows
}

/**
* @description find the new order of a connected client
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
findProfilOrder = async (req, res) => {
    const result = await connexion.query(`
        SELECT orders.ordersDate, orders.ordersId, orders.ordersStatus, orders.ordersTotalCost 
        FROM orders 
        WHERE orders.usersId = $1 
        AND orders.ordersStatus = 'n'
    `,  [req.user.email])
    
    return result.rows
}

/**
* @description find the favorite products of the connected client
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
findProfilFavoritesProduct = async (req, res) => {
    const result = await connexion.query(`
        SELECT product.productId, product.productName, product.productPicture, product.productPrice 
        FROM product 
        JOIN favorite_product ON product.productId = favorite_product.productId 
        WHERE favorite_product.usersId = $1 
        AND product.productStatus != 'm'
    `,  [req.user.email])

    return result.rows
}

/**
* @description find the favorite producers of the connected client
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
findProfilFavoritesProducer = async (req, res) => {
    const result = await connexion.query(`
        SELECT users.usersFirstname, users.usersLastname, users.usersProfilPicture 
        FROM user_producer 
        JOIN users ON user_producer.usersId = users.usersEmail 
        JOIN producer ON user_producer.producerId = producer.producerId 
        JOIN favorite_producer ON producer.producerId = favorite_producer.producerId 
        WHERE favorite_producer.usersId = $1 AND producer.producerStatus != 'm'
    `,  [req.user.email])
    
    return result.rows
}

/**
* @description update the information given with key=value
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
updateClientInformation = async (req, res) => {
    switch (req.body.key) {
    case "usersPassword":
        req.body.value = await hashPassword(req.body.value)
        await connexion.query(`
            UPDATE users 
            SET usersPassword=$1 
            WHERE usersEmail=$2
        `,  [req.body.value, req.user.email])
        break
    case "usersGender":
        await connexion.query(`
            UPDATE users 
            SET usersGender=$1 
            WHERE usersEmail=$2
        `,  [req.body.value, req.user.email])
        break
    case "usersLastname":
        await connexion.query(`
            UPDATE users 
            SET usersLastname=$1 
            WHERE usersEmail=$2
        `,  [req.body.value, req.user.email])
        break
    case "usersFirstname":
        await connexion.query(`
            UPDATE users 
            SET usersFirstname=$1 
            WHERE usersEmail=$2
        `,  [req.body.value, req.user.email])
        break
    case "usersProfilPicture":
        await connexion.query(`
            UPDATE users 
            SET usersProfilPicture=$1 
            WHERE usersEmail=$2
        `,  [req.body.value, req.user.email])
        break
    }
}

// export
module.exports = { findProfilUser, findProfilBasket, findProfilOrder, findProfilFavoritesProduct, findProfilFavoritesProducer, updateClientInformation }