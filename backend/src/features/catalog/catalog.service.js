// Business logic for catalog management
// Handles product listing with dynamic filters (category, subcategory, producer) and server-side pagination
// Handles single product retrieval by ID with full producer and category details

const { connexion } = require('../../database/database.js')

const getProducts = async ({ page = 1, category, subcategory, producer, q, search }) => {
    const limit = 10
    const offset = (parseInt(page) - 1) * limit
    const searchTerm = q || search

    let query = `
        SELECT 
            p.productId,
            p.productPicture,
            p.productName,
            p.productPrice,
            p.productDesc,
            c.categoryId,
            c.categoryName,
            sc.subcategoryId,
            sc.subcategoryName,
            pr.producerId,
            pr.producerDesc
        FROM product p
        LEFT JOIN category c ON p.categoryId = c.categoryId
        LEFT JOIN subcategory sc ON p.subcategoryId = sc.subcategoryId
        LEFT JOIN producer pr ON p.producerId = pr.producerId
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

    if (producer) {
        query += ` AND pr.producerId = $${paramIndex}`
        params.push(parseInt(producer))
        paramIndex++
    }

    if (searchTerm) {
        query += ` AND (
            p.productName ILIKE $${paramIndex}
            OR p.productDesc ILIKE $${paramIndex}
            OR c.categoryName ILIKE $${paramIndex}
            OR sc.subcategoryName ILIKE $${paramIndex}
            OR pr.producerDesc ILIKE $${paramIndex}
        )`
        params.push(`%${searchTerm.trim()}%`)
        paramIndex++
    }

    // Request for the total count
    const countQuery = `SELECT COUNT(*) FROM (${query}) AS total`
    const countResult = await connexion.query(countQuery, params)
    const total = parseInt(countResult.rows[0].count)

    // Request paginated results
    query += ` ORDER BY p.productId LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
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

const getProductById = async (id) => {
    const result = await connexion.query(`
        SELECT 
            p.productId,
            p.productPicture,
            p.productName,
            p.productPrice,
            p.productDesc,
            c.categoryId,
            c.categoryName,
            sc.subcategoryId,
            sc.subcategoryName,
            pr.producerId,
            pr.producerDesc
        FROM product p
        LEFT JOIN category c ON p.categoryId = c.categoryId
        LEFT JOIN subcategory sc ON p.subcategoryId = sc.subcategoryId
        LEFT JOIN producer pr ON p.producerId = pr.producerId
        WHERE p.productId = $1
    `, [id])

    if (result.rows.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND')
    }

    return result.rows[0]
}

const createProduct = async (userEmail, { productName, productPrice, categoryId, subcategoryId, productDesc, productImage }) => {
    const producerResult = await connexion.query(
        `SELECT pr.producerId
         FROM user_producer up
         JOIN producer pr ON up.producerId = pr.producerId
         WHERE up.usersId = $1`,
        [userEmail]
    )

    if (producerResult.rows.length === 0) {
        throw new Error('PRODUCER_NOT_FOUND')
    }

    const producerId = producerResult.rows[0].producerid

    const result = await connexion.query(
        `INSERT INTO product 
            (producerId, categoryId, subcategoryId, productName, productPrice, productDesc, productStatus, productPicture)
         VALUES ($1, $2, $3, $4, $5, $6, 'active', $7)
         RETURNING *`,
        [producerId, categoryId, subcategoryId || null, productName.trim(), productPrice, productDesc || null, productImage || null]
    )

    return result.rows[0]
}

const updateProduct = async (userEmail, productId, fields) => {
    const check = await connexion.query(`
        SELECT p.productId
        FROM product p
        JOIN user_producer up ON p.producerId = up.producerId
        WHERE p.productId = $1 AND up.usersId = $2
    `, [productId, userEmail])

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

    const result = await connexion.query(
        `UPDATE product SET ${updates.join(', ')} WHERE productId = $${index} RETURNING *`,
        values
    )

    return result.rows[0]
}

const deleteProduct = async (userEmail, productId) => {
    const check = await connexion.query(`
        SELECT p.productId
        FROM product p
        JOIN user_producer up ON p.producerId = up.producerId
        WHERE p.productId = $1 AND up.usersId = $2
    `, [productId, userEmail])

    if (check.rows.length === 0) {
        throw new Error('PRODUCT_NOT_FOUND_OR_UNAUTHORIZED')
    }

    await connexion.query('DELETE FROM product WHERE productId = $1', [productId])

    return { message: 'Produit supprimé avec succès' }
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
