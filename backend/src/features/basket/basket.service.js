// require
const { connexion } = require('../../database/database.js')

// function

/**
* @description Handle basket retrieval of the connected client
* @param {string} userEmail, the email of the connected client  
* @return {array of hash} the basket
*/
const getBasket = async (userEmail) => {
    // Retrieve items for this user from basket_items
    const items = await connexion.query(`
        SELECT bi.basketItemsId, bi.basketItemsQuantity, p.productId, p.productName, p.productPrice, (bi.basketItemsQuantity * p.productPrice) AS itemTotalPrice
        FROM basket_items bi
        LEFT JOIN product p ON bi.productId = p.productId
        WHERE bi.usersId = $1
    `,  [userEmail])

    const total = items.rows.reduce((sum, item) => sum + parseFloat(item.itemtotalprice || 0), 0)

    return {
        user: userEmail,
        items: items.rows,
        total: parseFloat(total.toFixed(2))
    }
}

/**
* @description Handle product addition to the basket of the connected client
* @param {string} userEmail, the email of the connected client  
* @param {hash} (productId, quantity)  
* @return {array of hash} the basket
*/
const InsertIntoBasket = async (userEmail, { productId, quantity }) => {
    // Verify if product exists and get price
    const product = await connexion.query(`
        SELECT productId, productPrice 
        FROM product 
        WHERE productId = $1
    `,  [productId])

    if (product.rows.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND')
    }

    // Verify if the product is already in the user's basket
    const existing = await connexion.query(`
        SELECT basketItemsId, basketItemsQuantity 
        FROM basket_items 
        WHERE usersId = $1 
        AND productId = $2
    `,  [userEmail, productId])

    const price = parseFloat(product.rows[0].productprice)

    if (existing.rows.length > 0) {
        // Update quantity and total cost
        const newQuantity = existing.rows[0].basketitemsquantity + quantity
        const newTotal = newQuantity * price
        await connexion.query(`
            UPDATE basket_items 
            SET basketItemsQuantity = $1, basketItemsTotalCost = $2 
            WHERE basketItemsId = $3
        `,  [newQuantity, newTotal, existing.rows[0].basketitemsid])
    } else {
        // Add product
        const totalCost = quantity * price
        await connexion.query(`
            INSERT INTO basket_items (usersId, productId, basketItemsQuantity, basketItemsTotalCost) 
            VALUES ($1, $2, $3, $4)
        `,  [userEmail, productId, quantity, totalCost])
    }

    return getBasket(userEmail)
}

/**
* @description Handle product removal from the basket of the connected client
* @param {string} userEmail, the email of the connected client  
* @param {int} basketItemsId, the id of the items to remove from the connected client basket
* @return {array of hash} the basket
*/
const deleteFromBasket = async (userEmail, basketItemsId) => {
    // Verify if the item belongs to the user's basket before deleting
    const check = await connexion.query(`
        SELECT basketItemsId 
        FROM basket_items 
        WHERE basketItemsId = $1 
        AND usersId = $2
    `,  [basketItemsId, userEmail])

    if (check.rows.length === 0) {
        throw new Error('ITEM_NOT_FOUND')
    }

    await connexion.query(`
        DELETE FROM basket_items 
        WHERE basketItemsId = $1
    `,  [basketItemsId])

    return getBasket(userEmail)
}

// export
module.exports = { getBasket, InsertIntoBasket, deleteFromBasket }