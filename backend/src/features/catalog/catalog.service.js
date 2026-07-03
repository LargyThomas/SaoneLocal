// require
const { connexion } = require('../../database/database.js')

/**
* @description get the information of all the products
* @param {hash} (page, category)  
* @return {array of hash} the information collected from the database
*/
const getProduct = async ({ page = 1, category, subcategory, q, search }) => {
    const limit = 10
    const offset = (parseInt(page) - 1) * limit
    const searchTerm = q || search

    let query = `
        SELECT p.productId, p.productPicture, p.productName, p.productPrice, p.productDesc, p.productStatus, c.categoryId, c.categoryName, sc.subcategoryId, sc.subcategoryName, pr.producerId, pr.producerDesc
        FROM product p
        LEFT JOIN category c ON p.categoryId = c.categoryId
        LEFT JOIN subcategory sc ON p.subcategoryId = sc.subcategoryId
        LEFT JOIN producer pr ON p.producerId = pr.producerId
        LEFT JOIN user_producer up ON up.producerId = pr.producerId
        LEFT JOIN users u ON u.usersEmail = up.usersId
        WHERE 1=1
    `

    const params = []
    let paramIndex = 1

    if (category) {
        query += ` AND p.categoryId = $${paramIndex}`
        params.push(parseInt(category))
        paramIndex++
    }

    if (subcategory) {
        query += ` AND p.subcategoryId = $${paramIndex}`
        params.push(parseInt(subcategory))
        paramIndex++
    }

    if (searchTerm) {
        query += ` AND (
            p.productName ILIKE $${paramIndex}
            OR p.productDesc ILIKE $${paramIndex}
            OR c.categoryName ILIKE $${paramIndex}
            OR sc.subcategoryName ILIKE $${paramIndex}
            OR pr.producerDesc ILIKE $${paramIndex}
            OR u.usersFirstname ILIKE $${paramIndex}
            OR u.usersLastname ILIKE $${paramIndex}
        )`
        params.push(`%${searchTerm.trim()}%`)
        paramIndex++
    }

    // Request for the total count
    const countQuery = `
    SELECT COUNT(*) 
    FROM (${query}) 
    AS total
    `

    const countResult = await connexion.query(countQuery, params)
    const total = parseInt(countResult.rows[0].count)

    // Request paginated results
    query += `
    ORDER BY p.productId 
    LIMIT $${paramIndex} 
    OFFSET $${paramIndex + 1}
    `
    
    params.push(limit, offset)

    const result = await connexion.query(query, params)

    return {
        products: result.rows,
        pagination: {
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            limit
        }
    }
}

/**
* @description get the information of the product productId
* @param {int} id, the id of the product
* @return {hash} the information collected from the database 
*/
const getProductById = async (id) => {
    const result = await connexion.query(`
        SELECT p.productId, p.productPicture, p.productName, p.productPrice, p.productDesc, p.productStatus, c.categoryId, c.categoryName, sc.subcategoryId, sc.subcategoryName, pr.producerId, pr.producerDesc
        FROM product p
        LEFT JOIN category c ON p.categoryId = c.categoryId
        LEFT JOIN subcategory sc ON p.subcategoryId = sc.subcategoryId
        LEFT JOIN producer pr ON p.producerId = pr.producerId
        WHERE p.productId = $1
    `,  [id])

    if (result.rows.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND')
    }

    return result.rows[0]
}

/**
* @description create a new product
* @param {sting} userEmail, the email of the producer of the new product
* @param {hash} (productName, productPrice, categoryId, subcategoryId, productDesc, productImage)
* @return {hash} the information of the added product
*/
const createProduct = async (userEmail, { productName, productPrice, categoryId, subcategoryId, productDesc, productImage }) => {
    const producerResult = await connexion.query(`
        SELECT pr.producerId
        FROM user_producer up
        JOIN producer pr ON up.producerId = pr.producerId
        WHERE up.usersId = $1
    `,  [userEmail]
    )

    if (producerResult.rows.length === 0) {
        throw new Error('PRODUCER_NOT_FOUND')
    }

    const producerId = producerResult.rows[0].producerid

    await connexion.query(`
        SELECT setval(
            pg_get_serial_sequence('product', 'productid'),
            COALESCE((SELECT MAX(productId) FROM product), 1)
        )
    `)

    const result = await connexion.query(`
        INSERT INTO product (producerId, categoryId, subcategoryId, productName, productPrice, productDesc, productStatus, productPicture)
        VALUES ($1, $2, $3, $4, $5, $6, 'active', $7)
        RETURNING *
    `,  [producerId, categoryId, subcategoryId || null, productName.trim(), productPrice, productDesc || null, productImage || null]
    )

    return result.rows[0]
}

/**
* @description update the product productId
* @param {string} userEmail, the email of the producer of the product
* @param {int} productId, the id of the product
* @param {hash} fields, the informations to update
* @return {hash} the information of the updated product
*/
const modifyProduct = async (userEmail, productId, fields) => {
    const check = await connexion.query(`
        SELECT p.productId
        FROM product p
        JOIN user_producer up ON p.producerId = up.producerId
        WHERE p.productId = $1 AND up.usersId = $2
    `,  [productId, userEmail])

    if (check.rows.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND_OR_UNAUTHORIZED')
    }

    const allowed = ['productName', 'productPrice', 'categoryId', 'subcategoryId', 'productDesc', 'productImage']
    const updates = []
    const values = []
    let index = 1

    const columnMap = {
        productImage: 'productPicture'
    }

    for (const key of allowed) {
        if (fields[key] !== undefined) {
            const column = columnMap[key] || key
            updates.push(`${column} = $${index}`)
            values.push(fields[key])
            index++
        }
    }

    if (updates.length === 0) {
        throw new Error('NO_FIELDS_TO_UPDATE')
    }

    values.push(productId)

    const result = await connexion.query(`
        UPDATE product 
        SET ${updates.join(', ')} 
        WHERE productId = $${index} 
        RETURNING *
    `,  values
    )

    return result.rows[0]
}

/**
* @description delete the product productId
* @param {string} userEmail,
* @param {int} productId,
* @param {hash} (productName, productPrice, categoryId, subcategoryId, productDesc, productImage)
* @return 
*/
const deleteProduct = async (userEmail, productId) => {
    const check = await connexion.query(`
        SELECT p.productId
        FROM product p
        JOIN user_producer up ON p.producerId = up.producerId
        WHERE p.productId = $1 AND up.usersId = $2
    `,  [productId, userEmail])

    if (check.rows.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND_OR_UNAUTHORIZED')
    }

    await connexion.query(`
        DELETE FROM product 
        WHERE productId = $1
    `,  [productId])
}

module.exports = { getProduct, getProductById, createProduct, modifyProduct, deleteProduct }
