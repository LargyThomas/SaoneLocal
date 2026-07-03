// require

const { connexion } = require('../../database/database.js')

// function

/**
* @description remove the duplicated number from an array
* @param {array} array, sorted array of int
* @return {array} the param array without the duplicated number
*/
function removeDuplicate(array) {
    let index = 0
    let length = array.length
    
    if (length <= 1) {
        return array
    }

    let returnArray = [array[0]["producerid"]]

    while (index < length) {
        if (returnArray[returnArray.length - 1] != array[index]["producerid"]) {
            returnArray[returnArray.length] = array[index]["producerid"]
        }
        index += 1
    }
    return returnArray
}

/**
* @description create a new order for each producer with a item in the basket
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if there are no items in the basket
*/
const createOrder = async (req, res) => {
    let result = await connexion.query(`
        SELECT product.producerId 
        FROM basket_items 
        JOIN product ON basket_items.productId = product.productId 
        WHERE basket_items.usersId = $1 
        ORDER BY product.producerId ASC
    `,  [req.user.email])
    
    if (result.rows.length == 0) {
        throw new Error('NO_ITEM_IN_THE_BASKET')
    }
    
    let producerArray = removeDuplicate(result.rows)
    let indexProducer = 0
    let totalCost = 0
    let index = 0

    while (indexProducer < producerArray.length) {
        result = await connexion.query(`
            INSERT INTO orders(usersId, ordersTotalCost, ordersDate, ordersStatus) 
            VALUES ($1, 0, NOW(), 'n') 
            RETURNING ordersId
        `,  [req.user.email])

        orderId = result.rows[0]["ordersid"]
        result = await connexion.query(`
            SELECT basket_items.productId, basket_items.basketItemsQuantity, basket_items.basketItemsTotalCost, basket_items.productId 
            FROM basket_items JOIN product ON basket_items.productId = product.productId 
            WHERE basket_items.usersId = $1 
            AND product.producerId = $2
        `,  [req.user.email, producerArray[indexProducer]])

        while (index < result.rows.length) {
            await connexion.query(`
                INSERT INTO orders_items(ordersId, productId, ordersItemsQuantity, ordersItemsTotalCost) 
                VALUES ($1, $2, $3, $4)
            `,  [orderId, result.rows[index]["productid"], result.rows[index]["basketitemsquantity"], result.rows[index]["basketitemstotalcost"]])
            
            totalCost += result.rows[index]["basketitemstotalcost"]
            index += 1
        }

        await connexion.query(`
            UPDATE orders 
            SET ordersTotalCost = $1 
            WHERE ordersid = $2
        `,  [totalCost, orderId])

        index = 0
        totalCost = 0
        indexProducer += 1
    }
    await connexion.query(`
        DELETE FROM basket_items 
        WHERE usersId = $1
    `,  [req.user.email])
}

/**
* @description change the status of the order id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} or {Error} the information collected from the database or an error if the id is not valid
*/
const changeStatus = async (req, res) => {
    let result = await connexion.query(`
        SELECT user_producer.producerId 
        FROM user_producer 
        WHERE user_producer.usersId = $1
    `,  [req.user.email])

    const producerId = result.rows[0]?.producerid

    result = await connexion.query(`
        SELECT orders_items.ordersId
        FROM orders_items 
        JOIN product ON orders_items.productId = product.productId 
        WHERE orders_items.ordersId = $1
        AND product.producerId = $2
    `,  [req.params.id, producerId])

    if (result.rows.length == 0) {
        throw new Error('YOU_CANNOT_ACCESS_THIS_ORDER')
    }

    await connexion.query(`
        UPDATE orders 
        SET ordersStatus = $1 
        WHERE ordersId = $2
    `,  [req.body["ordersStatus"], parseInt(req.params.id)])
    
    if (req.body["ordersStatus"] == 'a') {
        throw new Error('REPAYMENT_PROCEDURE')
    }
}

/**
* @description identify the role of the user and execute the right function for this role
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const dispatchRole = async (req, res) => {
    switch (req.user.role) {
        case 1:
            return await findOrdersUser(req, res)
            break
        case 2:
            return await findOrdersProducer(req, res)
            break
    }
}

/**
* @description find all the order of the user connected
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findOrdersUser = async (req, res) => {
    const result = await connexion.query(`
        SELECT orders.ordersDate, orders.ordersId, orders.ordersStatus, orders.ordersTotalCost, orders_items.ordersItemsQuantity, orders_items.ordersItemsTotalCost, product.productName 
        FROM orders_items 
        JOIN orders ON orders_items.ordersId = orders.ordersId 
        JOIN product ON orders_items.productId = product.productId 
        WHERE orders.usersId = $1
    `,  [req.user.email])
    return result.rows
}

/**
* @description find all the order of the producer connected
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findOrdersProducer = async (req, res) => {
    const producerId = await connexion.query(`
        SELECT user_producer.producerId 
        FROM user_producer 
        WHERE user_producer.usersId = $1
    `,  [req.user.email])

    const result = await connexion.query(`
        SELECT users.usersFirstname, users.usersLastname, orders.ordersId, orders.ordersStatus, orders.ordersTotalCost, orders.ordersDate, orders_items.ordersItemsQuantity, orders_items.ordersItemsTotalCost, product.productName 
        FROM orders_items JOIN orders ON orders_items.ordersId = orders.ordersId 
        JOIN product ON orders_items.productId = product.productId 
        JOIN users ON orders.usersId = users.usersEmail 
        WHERE product.producerId = $1
    `,  [producerId.rows[0]["producerid"]])

    return result.rows
}

// export
module.exports = { createOrder, changeStatus, dispatchRole }
