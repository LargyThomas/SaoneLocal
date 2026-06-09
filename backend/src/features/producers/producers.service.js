// require
const { connexion } = require('../../database/database.js')

// function

/**
* @description generated a random number
* @param {int} max, the number max of the random number
* @return {int} the random number generated
*/
function getRandomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

/**
* @description find all the producers
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
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

findProductProducerIdPage = async (req, res, number) => {
    let result = await connexion.query("SELECT producerStatus FROM producer WHERE producer.producerId = $1", [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }

    result = await connexion.query("SELECT productId, productName, productPicture, productPrice, productStatus FROM product WHERE producerId = $1 AND productStatus = 'active'", [req.params.id])
    
    if (result.rows.length <= number) {
        return result.rows
    }

    let array_result = []
    let index = 0
    while (index < number) {
        array_result[index] = result.rows.splice(getRandomNumber(result.rows.length - 1), 1)[0]
        index += 1
    }
    return array_result
}

/**
* @description find all the events of the producer id and id and verify if the id is valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
findProductEventIdPage = async (req, res) => {
    result = await connexion.query("SELECT events.eventsLocation, events.eventsDate, events.eventsName FROM events JOIN go_to_events ON events.eventsId = go_to_events.eventsId WHERE go_to_events.producerId = $1", [req.params.id])
    return result.rows
}

/**
* @description find all the products of the producers id and verify if the id is valid
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
module.exports = {findAllProducer, findProducerId, findProductProducerIdPage, findProductEventIdPage, findAllProductProducerId}