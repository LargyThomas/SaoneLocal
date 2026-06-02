// require
const { connexion } = require('../../database/database.js')
const { checkout, param } = require('./producers.routes.js')

// function

/**
* @description find all the producers
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
findAllProducer = async (req, res) => {
    const result = await connexion.query("SELECT users.usersfirstname, users.userslastname, users.usersProfilPicture, producer.producerLocalisation, producer.producerId FROM user_producer JOIN users ON user_producer.usersId = users.usersEmail JOIN producer ON user_producer.producerId = producer.producerId WHERE producer.producerStatus = 'active'")
    return result.rows
}

/**
* @description find all the information of the producer with the id give
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
findProducerId = async (req, res) => {
    const result = await connexion.query("SELECT users.usersfirstname, users.userslastname, users.usersProfilPicture, users.usersLastConnexion, producer.producerDesc, producer.producerLocalisation, producer.producerSiretNum, producer.producerId, producerStatus FROM user_producer JOIN users ON user_producer.usersId = users.usersEmail JOIN producer ON user_producer.producerId = producer.producerId WHERE producer.producerId = $1", [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }
    return result.rows
}

/**
* @description find all the products of the producers and id and verify if the id is valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
findAllProductProducerId = async (req, res) => {
    let result = await connexion.query("SELECT producerStatus FROM producer WHERE producer.producerId = $1", [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }

    result = await connexion.query("SELECT productId, productName, productPicture, productPrice, productStatus FROM product WHERE producerId = $1", [req.params.id])
    return result.rows
}

// export
module.exports = {findAllProducer, findProducerId, findAllProductProducerId}