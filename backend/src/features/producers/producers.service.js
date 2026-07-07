// require
const { connexion } = require('../../database/database.js')

// function

/**
* @description remove the duplicated number from an array
* @param {array} array, sorted array of int
* @return {array} the param array without the duplicated number
*/
function removeDuplicate(array, key) {
    let index = 0
    let length = array.length
    
    if (length === 0) {
        return []
    }

    if (length === 1) {
        return [array[0][key]]
    }

    let returnArray = [array[0][key]]

    while (index < length) {
        if (returnArray[returnArray.length - 1] != array[index][key]) {
            returnArray[returnArray.length] = array[index][key]
        }
        index += 1
    }
    return returnArray
}

/**
* @description generate a random number
* @param {int} max, the maximum of the random number
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
const findAllProducer = async (req, res) => {
    const result = await connexion.query(`
        SELECT users.usersFirstname, users.usersLastname, users.usersProfilPicture, producer.producerLocalisation, producer.producerId 
        FROM user_producer 
        JOIN users ON user_producer.usersId = users.usersEmail 
        JOIN producer ON user_producer.producerId = producer.producerId 
        WHERE producer.producerStatus = 'active'
    `)
    return result.rows
}

/**
* @description find all the information of an id producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
const findProducerId = async (req, res) => {
    const result = await connexion.query(`
        SELECT users.usersFirstname, users.usersLastname, users.usersProfilPicture, users.usersLastConnexion, producer.producerDesc, producer.producerLocalisation, producer.producerSiretNum, producer.producerId, producerStatus 
        FROM user_producer 
        JOIN users ON user_producer.usersId = users.usersEmail 
        JOIN producer ON user_producer.producerId = producer.producerId 
        WHERE producer.producerId = $1
    `,  [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }
    return result.rows
}

/**
* @description find all the products information of an id producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {int} number, number of random products to select
* @return {array of hash} the information collected from the database
*/
const findProductProducerIdPage = async (req, res, number) => {
    let result = await connexion.query(`
        SELECT producerStatus 
        FROM producer 
        WHERE producer.producerId = $1
    `,  [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }

    result = await connexion.query(`
        SELECT productId, productName, productPicture, productPrice, productStatus 
        FROM product 
        WHERE producerId = $1 
        AND productStatus = 'active'
    `,  [req.params.id])
    
    if (result.rows.length <= number) {
        return result.rows
    }

    let arrayResult = []
    let index = 0
    while (index < number) {
        arrayResult[index] = result.rows.splice(getRandomNumber(result.rows.length - 1), 1)[0]
        index += 1
    }
    return arrayResult
}

/**
* @description find all the events information of an id producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
const findEventProducerIdPage = async (req, res) => {
    const result = await connexion.query(`
        SELECT events.eventsLocation, events.eventsDate, events.eventsName 
        FROM events 
        JOIN go_to_events ON events.eventsId = go_to_events.eventsId 
        WHERE go_to_events.producerId = $1
    `,  [req.params.id])
    return result.rows
}

/**
* @description verify if the given id is valid and find all the products of an id producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
const findAllProductProducerId = async (req, res) => {
    let result = await connexion.query(`
        SELECT producerStatus 
        FROM producer 
        WHERE producer.producerId = $1
    `,  [req.params.id])
    
    if (result.rows.length === 0) {
        throw new Error('THIS_ID_DOES_NOT_EXIST')
    }
    
    if (result.rows[0]["producerstatus"] != 'active') {
        throw new Error('PRODUCER_NOT_ACTIVE')
    }

    result = await connexion.query(`
        SELECT productId, productName, productPicture, productPrice, productStatus 
        FROM product 
        WHERE producerId = $1
    `,  [req.params.id])

    return result.rows
}

/**
* @description find all the information of the connected producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findProfilUser = async (req, res) => {
    const result = await connexion.query(`
        SELECT producer.producerDesc, producer.producerLocalisation, producer.producerSiretNum, producer.producerCreationDate, producer.producerLastConnexion, users.usersFirstname, users.usersLastname, users.usersGender, users.usersCreationDate, users.usersProfilPicture 
        FROM user_producer 
        JOIN users ON user_producer.usersId = users.usersEmail 
        JOIN producer ON user_producer.producerId = producer.producerId 
        WHERE users.usersEmail = $1
    `,  [req.user.email])

    return result.rows
}

/**
* @description find all the products the connected producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findProfilProduct = async (req, res) => {
    const resultProducerId = await connexion.query(`
        SELECT user_producer.producerId 
        FROM user_producer 
        JOIN users ON user_producer.usersId = users.usersEmail 
        WHERE users.usersEmail = $1
    `,  [req.user.email])

    const result = await connexion.query(`
        SELECT productId, productName, productPicture, productPrice, productDesc, productStatus, categoryId, subcategoryId
        FROM product 
        WHERE producerId = $1
        ORDER BY productId ASC
    `,  [resultProducerId.rows[0]["producerid"]])

    return result.rows
}

/**
* @description find all the new orders of the connected producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findProfilOrder = async (req, res) => {
    const resultProducerId = await connexion.query(`
        SELECT user_producer.producerId 
        FROM user_producer 
        JOIN users ON user_producer.usersId = users.usersEmail 
        WHERE users.usersEmail = $1
    `,  [req.user.email])

    let result = await connexion.query(`
        SELECT orders.ordersId 
        FROM orders_items 
        JOIN orders ON orders_items.ordersId = orders.ordersId 
        JOIN product ON orders_items.productId = product.productId 
        JOIN users ON orders.usersId = users.usersEmail 
        WHERE product.producerId = $1 AND orders.ordersStatus = 'n' 
        ORDER BY orders.ordersId ASC
    `,  [resultProducerId.rows[0]["producerid"]])
    
    const orderArray = removeDuplicate(result.rows, "ordersid")

    let returnArray = []
    let index = 0
    while (index < orderArray.length) {
        result = await connexion.query(`
            SELECT users.usersFirstname, users.usersLastname, orders.ordersId, orders.ordersStatus, orders.ordersTotalCost, orders.ordersDate
            FROM orders 
            JOIN users ON orders.usersId = users.usersEmail
            WHERE orders.ordersId = $1
        `,  [orderArray[index]])
        
        returnArray[index] = result.rows[0]
        index += 1
    }
    // 
    return returnArray
}

/**
* @description find the statistics of the connected producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findProfilStatistic = async (req, res) => {
    const resultProducerId = await connexion.query(`
        SELECT user_producer.producerId 
        FROM user_producer 
        WHERE user_producer.usersId = $1
    `,  [req.user.email])

    const resultStatTotalProduct = await connexion.query(`
        SELECT SUM(orders_items.ordersItemsQuantity) AS statTotalProduct 
        FROM orders_items JOIN orders ON orders_items.ordersId = orders.ordersId 
        JOIN product ON orders_items.productId = product.productId 
        WHERE product.producerId = $1 AND orders.ordersStatus != 'a'
    `,  [resultProducerId.rows[0]["producerid"]])
    
    const orderArray = await findProfilOrder(req, res)
    let resultStatTotalCost = 0
    let index = 0
    while (index < orderArray.length) {
        resultStatTotalCost += orderArray[index]["orderstotalcost"]
        index += 1
    }
    return {"statTotalCost": resultStatTotalCost, "statTotalProduct": resultStatTotalProduct.rows[0]["stattotalproduct"]}
}

/**
* @description update the given key with the given value
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const updateProducerInformation = async (req, res) => {
    let resultProducerId = {}
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
        case "producerDesc":
            resultProducerId = await connexion.query(`
                SELECT user_producer.producerId 
                FROM user_producer 
                WHERE user_producer.usersId = $1
            `,  [req.user.email])
            
            await connexion.query(`
                UPDATE producer 
                SET producerDesc=$1 
                WHERE producerId=$2
            `,  [req.body.value, resultProducerId.rows[0]["producerid"]])
            break
        case "producerLocalisation":
            resultProducerId = await connexion.query(`
                SELECT user_producer.producerId 
                FROM user_producer 
                WHERE user_producer.usersId = $1
            `,  [req.user.email])
            
            await connexion.query(`
                UPDATE producer 
                SET producerLocalisation=$1 
                WHERE producerId=$2
            `,  [req.body.value, resultProducerId.rows[0]["producerid"]])
            break
        case "producerSiretNum":
            resultProducerId = await connexion.query(`
                SELECT user_producer.producerId 
                FROM user_producer 
                WHERE user_producer.usersId = $1
            `,  [req.user.email])
            
            await connexion.query(`
                UPDATE producer 
                SET producerSiretNum=$1 
                WHERE producerId=$2
            `,  [req.body.value, resultProducerId.rows[0]["producerid"]])
            break
    }
}

// export
module.exports = { findAllProducer, findProducerId, findProductProducerIdPage, findEventProducerIdPage, findAllProductProducerId, findProfilUser, findProfilProduct, findProfilStatistic, findProfilOrder, updateProducerInformation }
