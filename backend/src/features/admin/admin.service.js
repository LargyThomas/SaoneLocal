// require
const { connexion } = require('../../database/database.js')
const { hashPassword } = require('../../security/crypto.js')

// function

/**
* @description create a new producer account
* @param {hash} (email, password, gender, lastName, firstName, producerDesc, producerLocalisation, producerSiretNum, userStatus = 'active', producerStatus = 'active') 
* @return {hash} 
*/
const createProducer = async ({ email, password, gender, lastName, firstName, producerDesc, producerLocalisation, producerSiretNum, userStatus = 'active', producerStatus = 'active' }) => {
    const existingUser = await connexion.query(`
        SELECT usersEmail 
        FROM users 
        WHERE usersEmail = $1
    `,  [email])

    if (existingUser.rows.length > 0) {
        throw new Error('EMAIL_EXISTE_DEJA')
    }

    const existingProducer = await connexion.query(`
        SELECT producerId 
        FROM producer 
        WHERE producerSiretNum = $1
    `,  [producerSiretNum])

    if (existingProducer.rows.length > 0) {
        throw new Error('SIRET_EXISTE_DEJA')
    }

    const hashedPassword = await hashPassword(password)
    const user = await connexion.query(`
        INSERT INTO users (usersEmail, usersPassword, usersGender, usersLastname, usersFirstname, usersCreationDate, usersLastConnexion, usersRole, usersStatus) 
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6, $7) 
        RETURNING usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersCreationDate
    `,  [email, hashedPassword, gender, lastName, firstName, 2, userStatus])
    
    const producer = await connexion.query(`
        INSERT INTO producer (producerDesc, producerLocalisation, producerSiretNum, producerStatus) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `,  [producerDesc || null, producerLocalisation || null, producerSiretNum, producerStatus])

    await connexion.query(`
        INSERT INTO user_producer (usersId, producerId) 
        VALUES ($1, $2)
    `,  [email, producer.rows[0].producerid])

    try {
        const existingUser = await connexion.query(`
            SELECT usersEmail 
            FROM users 
            WHERE usersEmail = $1
        `,  [email])

        if (existingUser.rows.length > 0) {
            throw new Error('EMAIL_EXISTE_DEJA')
        }

        const existingProducer = await connexion.query(`
            SELECT producerId 
            FROM producer 
            WHERE producerSiretNum = $1
        `,  [producerSiretNum])

        if (existingProducer.rows.length > 0) {
            throw new Error('SIRET_EXISTE_DEJA')
        }

        const user = await connexion.query(`
            INSERT INTO users (usersEmail, usersPassword, usersGender, usersLastname, usersFirstname, usersCreationDate, usersLastConnexion, usersRole, usersStatus) 
            VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6, $7) 
            RETURNING usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersCreationDate
        `,  [email, hashedPassword, gender, lastName, firstName, 2, userStatus])
        
        const producer = await connexion.query(`
            INSERT INTO producer (producerDesc, producerLocalisation, producerSiretNum, producerStatus) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `,  [producerDesc || null, producerLocalisation || null, producerSiretNum, producerStatus])

        await connexion.query(`
            INSERT INTO user_producer (usersId, producerId) 
            VALUES ($1, $2)
        `,  [email, producer.rows[0].producerid])
        
        await connexion.query('COMMIT')

        return { user: user.rows[0], producer: producer.rows[0] }
    } catch (error) {
        await connexion.query('ROLLBACK')
        throw error
    }
}

/**
* @description delete a producer account
* @param {int} producerId,  
* @return {hash} 
*/
const deleteProducer = async (producerId) => {
    const producer = await connexion.query(`
        SELECT p.producerId, p.producerSiretNum, up.usersId 
        FROM producer p 
        LEFT JOIN user_producer up ON up.producerId = p.producerId 
        WHERE p.producerId = $1
    `,  [producerId])

    if (producer.rows.length === 0) {
        throw new Error('PRODUCTEUR_NON_TROUVE')
    }

    await connexion.query(`
        UPDATE producer 
        SET producerStatus = $1 
        WHERE producerId = $2
    `,  ['inactive', producerId])

    if (producer.rows[0].usersid) {
        await connexion.query(`
            UPDATE users SET usersStatus = $1 
            WHERE usersEmail = $2
        `,  ['inactive', producer.rows[0].usersid])
    }

    return {
        producerId: producer.rows[0].producerid,
        producerSiretNum: producer.rows[0].producersiretnum,
        producerStatus: 'inactive',
        usersEmail: producer.rows[0].usersid,
        usersStatus: producer.rows[0].usersid ? 'inactive' : null
    }
}

/**
* @description 
* @param {int} producerId,  
* @return {hash} 
*/
const activateProducer = async (producerId) => {
    const producer = await connexion.query(`
        SELECT p.producerId, p.producerSiretNum, up.usersId 
        FROM producer p 
        LEFT JOIN user_producer up ON up.producerId = p.producerId 
        WHERE p.producerId = $1
    `,  [producerId])

    if (producer.rows.length === 0) {
        throw new Error('PRODUCTEUR_NON_TROUVE')
    }

    await connexion.query(`
        UPDATE producer 
        SET producerStatus = $1 
        WHERE producerId = $2
    `,  ['active', producerId])

    if (producer.rows[0].usersid) {
        await connexion.query(`
            UPDATE users 
            SET usersStatus = $1 
            WHERE usersEmail = $2
        `,  ['active', producer.rows[0].usersid])
    }

    return {
        producerId: producer.rows[0].producerid,
        producerSiretNum: producer.rows[0].producersiretnum,
        producerStatus: 'active',
        usersEmail: producer.rows[0].usersid,
        usersStatus: producer.rows[0].usersid ? 'active' : null
    }
}

/**
* @description get all the producers information
* @param 
* @return {array of hash}  
*/
const getProducer = async () => {
    const producers = await connexion.query(`
        SELECT p.*, up.usersId, u.usersFirstname, u.usersLastname, u.usersCreationDate, u.usersStatus 
        FROM producer p 
        LEFT JOIN user_producer up ON up.producerId = p.producerId 
        LEFT JOIN users u ON u.usersEmail = up.usersId 
        ORDER BY p.producerId DESC
    `)
    
    return producers.rows
}

/**
* @description get the dashboard information
* @param 
* @return {array of hash}  
*/
const getDashboard = async () => {
    const users = await connexion.query(`
        SELECT COUNT(*) AS total 
        FROM users
    `)

    const producers = await connexion.query(`
        SELECT COUNT(*) AS total 
        FROM producer
    `)

    const orders = await connexion.query(`
        SELECT COUNT(*) AS total 
        FROM orders
    `)

    const revenue = await connexion.query(`
        SELECT COALESCE(SUM(ordersTotalCost), 0) AS total 
        FROM orders
    `)

    const recentOrders = await connexion.query(`
        SELECT o.ordersId, o.ordersStatus, o.ordersTotalCost, o.ordersDate, u.usersFirstname, u.usersLastname 
        FROM orders o 
        JOIN users u ON u.usersEmail = o.usersId 
        ORDER BY o.ordersDate DESC, o.ordersId DESC LIMIT 5
    `)

    const newUsers = await connexion.query(`
        SELECT usersEmail, usersFirstname, usersLastname, usersRole, usersStatus, usersCreationDate 
        FROM users 
        ORDER BY usersCreationDate DESC LIMIT 5
    `)

    const ordersDistribution = await connexion.query(`
        SELECT ordersStatus, COUNT(*) AS total 
        FROM orders GROUP BY ordersStatus 
        ORDER BY ordersStatus
    `)

    const ordersEvolution = await connexion.query(`
        SELECT ordersDate, COUNT(*) AS total 
        FROM orders GROUP BY ordersDate 
        ORDER BY ordersDate ASC LIMIT 31
    `)

    return {
        totalUsers: Number(users.rows[0].total),
        totalProducers: Number(producers.rows[0].total),
        totalOrders: Number(orders.rows[0].total),
        totalRevenue: Number(revenue.rows[0].total),
        recentOrders: recentOrders.rows,
        newUsers: newUsers.rows,
        ordersDistribution: ordersDistribution.rows,
        ordersEvolution: ordersEvolution.rows
    }
}

/**
* @description get all the users information
* @param 
* @return {array of hash}  
*/
const getUser = async () => {
    const users = await connexion.query(`
        SELECT usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersProfilPicture, usersCreationDate, usersLastConnexion 
        FROM users 
        ORDER BY usersCreationDate DESC
    `)

    return users.rows
}

/**
* @description get the information of the email user
* @param {string} email, the email of the user
* @return {array of hash} the information collected from the database
*/
const getUserByEmail = async (email) => {
    const user = await connexion.query(`
        SELECT usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersProfilPicture, usersCreationDate, usersLastConnexion 
        FROM users 
        WHERE usersEmail = $1
    `,  [email])

    if (user.rows.length === 0) {
        throw new Error('UTILISATEUR_NON_TROUVE')
    }

    return user.rows[0]
}

/**
* @description update the role or the status of an email user
* @param {string} email, the email of the user
* @param {hash} (usersRole, usersStatus)
* @return {array of hash} the information of the updated user
*/
const modifyUser = async (email, { usersRole, usersStatus }) => {
    const existingUser = await connexion.query(`
        SELECT usersRole 
        FROM users 
        WHERE usersEmail = $1
    `,  [email])

    if (existingUser.rows.length === 0) {
        throw new Error('UTILISATEUR_NON_TROUVE')
    }

    const currentRole = Number(existingUser.rows[0].usersrole)
    const newRole = Number(usersRole)

    if ((currentRole === 2 || newRole === 2) && currentRole !== newRole) {
        throw new Error('ROLE_PRODUCTEUR_INCOHERENT')
    }

    const user = await connexion.query(`
        UPDATE users 
        SET usersRole = $1, usersStatus = $2 
        WHERE usersEmail = $3 RETURNING usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersProfilPicture, usersCreationDate, usersLastConnexion
    `,  [usersRole, usersStatus, email])

    return user.rows[0]
}

/**
* @description get the information of all the orders
* @param 
* @return {array of hash} the information collected from the database
*/
const getOrder = async () => {
    const orders = await connexion.query(`
        SELECT o.ordersId, o.usersId, o.ordersTotalCost, o.ordersDate, o.ordersStatus, u.usersFirstname, u.usersLastname 
        FROM orders o 
        LEFT JOIN users u ON u.usersEmail = o.usersId 
        ORDER BY o.ordersDate DESC, o.ordersId DESC
    `)

    return orders.rows
}

/**
* @description get the information of the orderId order
* @param {int} orderId, the id of the order
* @return {array of hash} the information collected from the database
*/
const getOrderById = async (orderId) => {
    const order = await connexion.query(`
        SELECT o.ordersId, o.usersId, o.ordersTotalCost, o.ordersDate, o.ordersStatus, u.usersFirstname, u.usersLastname 
        FROM orders o 
        LEFT JOIN users u ON u.usersEmail = o.usersId 
        WHERE o.ordersId = $1
    `,  [orderId])

    if (order.rows.length === 0) {
        throw new Error('COMMANDE_NON_TROUVEE')
    }

    const items = await connexion.query(`
        SELECT oi.ordersItemsId, oi.productId, oi.ordersItemsQuantity, oi.ordersItemsTotalCost, p.productName, p.productPrice, p.productStatus, pr.producerId, pr.producerSiretNum 
        FROM orders_items oi 
        LEFT JOIN product p ON p.productId = oi.productId 
        LEFT JOIN producer pr ON pr.producerId = p.producerId 
        WHERE oi.ordersId = $1 
        ORDER BY oi.ordersItemsId ASC
    `,  [orderId])

    return { ...order.rows[0], items: items.rows }
}

/**
* @description update the status of the orderId order
* @param {int} ordersId, the id of the order to update
* @param {string} ordersStatus, the new status of the order
* @return {array of hash} the information of the updated order
*/
const modifyOrderStatus = async (orderId, ordersStatus) => {
    const order = await connexion.query(`
        UPDATE orders 
        SET ordersStatus = $1 
        WHERE ordersId = $2 
        RETURNING ordersId, usersId, ordersTotalCost, ordersDate, ordersStatus
    `,  [ordersStatus, orderId])

    if (order.rows.length === 0) {
        throw new Error('COMMANDE_NON_TROUVEE')
    }

    return order.rows[0]
}

/**
* @description cancel the order
* @param {int} ordersId, the id of the order to update
* @return {array of hash} the information of the updated order 
*/
const annulOrder = async (orderId) => {
    return modifyOrderStatus(orderId, 'a')
}

/**
* @description get the information of all the products
* @param 
* @return {array of hash} the information collected from the database
*/
const getProduct = async () => {
    const products = await connexion.query(`
        SELECT p.productId, p.producerId, p.categoryId, p.subcategoryId, p.productName, p.productPrice, p.productDesc, p.productStatus, p.productPicture, pr.producerSiretNum, c.categoryName, sc.subcategoryName 
        FROM product p 
        LEFT JOIN producer pr ON pr.producerId = p.producerId 
        LEFT JOIN category c ON c.categoryId = p.categoryId 
        LEFT JOIN subcategory sc ON sc.subcategoryId = p.subcategoryId 
        ORDER BY p.productId DESC
    `)
    
    return products.rows
}

/**
* @description  get the information of the productId product
* @param {int} productId, the id of the product
* @return {array of hash} the information collected from the database
*/
const getProductById = async (productId) => {
    const product = await connexion.query(`
        SELECT p.productId, p.producerId, p.categoryId, p.subcategoryId, p.productName, p.productPrice, p.productDesc, p.productStatus, p.productPicture, pr.producerSiretNum, c.categoryName, sc.subcategoryName 
        FROM product p 
        LEFT JOIN producer pr ON pr.producerId = p.producerId 
        LEFT JOIN category c ON c.categoryId = p.categoryId 
        LEFT JOIN subcategory sc ON sc.subcategoryId = p.subcategoryId 
        WHERE p.productId = $1
    `,  [productId])

    if (product.rows.length === 0) {
        throw new Error('PRODUIT_NON_TROUVE')
    }

    return product.rows[0]
}

/**
* @description update the status of the productId product
* @param {int} productId, the id of the product to update
* @param {string} productStatus, the new status of the product
* @return {array of hash} the information of the updated product
*/
const updateProductStatus = async (productId, productStatus) => {
    const product = await connexion.query(`
        UPDATE product 
        SET productStatus = $1 
        WHERE productId = $2 
        RETURNING productId, producerId, categoryId, subcategoryId, productName, productPrice, productDesc, productStatus, productPicture
    `,  [productStatus, productId])

    if (product.rows.length === 0) {
        throw new Error('PRODUIT_NON_TROUVE')
    }

    return product.rows[0]
}

/**
* @description deactivate a product
* @param {int} productId, the id of the product to update
* @return {array of hash} the informations of the updated product
*/
const deactivateProduct = async (productId) => {
    return updateProductStatus(productId, 'inactive')
}

/**
* @description enable a product
* @param {int} productId, the id of the product to update
* @return {array of hash} the information of the updated product
*/
const activateProduct = async (productId) => {
    return updateProductStatus(productId, 'active')
}

/**
* @description delete a product
* @param {int} productId, the id of the product to update
* @return {array of hash} the information of the deleted product
*/
const deleteProduct = async (productId) => {
    const product = await connexion.query(`
        DELETE FROM product 
        WHERE productId = $1 
        RETURNING productId, productName, productStatus
    `,  [productId])

    if (product.rows.length === 0) {
        throw new Error('PRODUIT_NON_TROUVE')
    }

    return product.rows[0]
}

/**
* @description get the information of all the events
* @param 
* @return {array of hash} the information collected from the database
*/
const getEvent = async () => {
    const events = await connexion.query(`
        SELECT eventsId, eventsLocation, eventsDate, eventsName, eventsDesc 
        FROM events 
        ORDER BY eventsDate DESC, eventsId DESC
    `)

    return events.rows
}

/**
* @description get the information of the eventId event
* @param {int} eventId, the id of the event
* @return {array of hash} the information collected from the database
*/
const getEventById = async (eventId) => {
    const event = await connexion.query(`
        SELECT eventsId, eventsLocation, eventsDate, eventsName, eventsDesc 
        FROM events 
        WHERE eventsId = $1
    `,  [eventId])

    if (event.rows.length === 0) {
        throw new Error('EVENEMENT_NON_TROUVE')
    }

    return event.rows[0]
}

/**
* @description create a new event
* @param {hash} (eventsLocation, eventsDate, eventsName, eventsDesc)
* @return {array of hash} the information of the added event
*/
const createEvent = async ({ eventsLocation, eventsDate, eventsName, eventsDesc }) => {
    const event = await connexion.query(`
        INSERT INTO events (eventsLocation, eventsDate, eventsName, eventsDesc, eventsStatus) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING eventsId, eventsLocation, eventsDate, eventsName, eventsDesc, eventsStatus
    `,  [eventsLocation, eventsDate, eventsName, eventsDesc, 'active'])
    
    return event.rows[0]
}

/**
* @description update the eventId event
* @param {int} eventId, the id of the event
* @param {hash} (eventsLocation, eventsDate, eventsName, eventsDesc)
* @return {array of hash} the information of the updated event
*/
const modifyEvent = async (eventId, { eventsLocation, eventsDate, eventsName, eventsDesc }) => {
    const event = await connexion.query(`
        UPDATE events 
        SET eventsLocation = $1, eventsDate = $2, eventsName = $3, eventsDesc = $4 
        WHERE eventsId = $5 
        RETURNING eventsId, eventsLocation, eventsDate, eventsName, eventsDesc
    `,  [eventsLocation, eventsDate, eventsName, eventsDesc, eventId])

    if (event.rows.length === 0) {
        throw new Error('EVENEMENT_NON_TROUVE')
    }

    return event.rows[0]
}

/**
* @description update the eventId event
* @param {int} eventId, the id of the event
* @param {string} eventsStatus, the new status of the event
* @return {array of hash} the information of the updated event
*/
const modifyEventStatus = async (eventId, eventsStatus) => {
    const event = await connexion.query(`
        SELECT eventsId 
        FROM events 
        WHERE eventsId = $1
    `,  [eventId])

    if (event.rows.length === 0) {
        throw new Error('EVENEMENT_NON_TROUVE')
    }

    try {
        const updatedEvent = await connexion.query(`
            UPDATE events 
            SET eventsStatus = $1 
            WHERE eventsId = $2 
            RETURNING eventsId, eventsLocation, eventsDate, eventsName, eventsDesc, eventsStatus
        `,  [eventsStatus, eventId])

        return updatedEvent.rows[0]
    } catch (error) {
        if (error.code === '42703') {
            throw new Error('EVENT_STATUS_COLUMN_MISSING')
        }
        throw error
    }
}

/**
* @description deactivate the eventId event
* @param {int} eventId, the id of the event
* @return {array of hash} the information of the updated event
*/
const deactivateEvent = async (eventId) => {
    return modifyEventStatus(eventId, 'inactive')
}

/**
* @description enable the eventId event
* @param {int} eventId, the id of the event
* @return {array of hash} the information of the updated event
*/
const activateEvent = async (eventId) => {
    return modifyEventStatus(eventId, 'active')
}

/**
* @description delete the eventId event
* @param {int} eventId, the id of the event
* @return {array of hash} the information of the deleted event
*/
const deleteEvent = async (eventId) => {
    await connexion.query(`
        DELETE FROM go_to_events 
        WHERE eventsId = $1
    `,  [eventId])

    const event = await connexion.query(`
        DELETE FROM events 
        WHERE eventsId = $1 
        RETURNING eventsId, eventsLocation, eventsDate, eventsName, eventsDesc
    `,  [eventId])

    if (event.rows.length === 0) {
        throw new Error('EVENEMENT_NON_TROUVE')
    }

    return event.rows[0]
}

/**
* @description get the log of the users
* @param 
* @return {array of hash} the different logs
*/
const getLogs = async () => {
    const usersCreated = await connexion.query(`
        SELECT usersFirstname, usersLastname, usersEmail, usersCreationDate 
        FROM users 
        ORDER BY usersCreationDate DESC LIMIT 5
    `)

    const usersConnected = await connexion.query(`
        SELECT usersFirstname, usersLastname, usersEmail, usersLastConnexion 
        FROM users 
        ORDER BY usersLastConnexion DESC LIMIT 5
    `)

    const orders = await connexion.query(`
        SELECT o.ordersId, o.ordersDate, u.usersFirstname, u.usersLastname 
        FROM orders o JOIN users u ON u.usersEmail = o.usersId 
        ORDER BY o.ordersDate DESC LIMIT 5
    `)

    const events = await connexion.query(`
        SELECT eventsName, eventsDate 
        FROM events 
        ORDER BY eventsDate DESC LIMIT 5
    `)

    let logs = []

    usersCreated.rows.forEach(user => {
        logs.push({
            user: `${user.usersfirstname} ${user.userslastname}`,
            action: 'Création utilisateur',
            target: user.usersemail,
            date: user.userscreationdate
        })
    })

    usersConnected.rows.forEach(user => {
        logs.push({
            user: `${user.usersfirstname} ${user.userslastname}`,
            action: 'Connexion',
            target: user.usersemail,
            date: user.userslastconnexion
        })
    })

    orders.rows.forEach(order => {
        logs.push({
            user: `${order.usersfirstname} ${order.userslastname}`,
            action: 'Commande créée',
            target: `#${order.ordersid}`,
            date: order.ordersdate
        })
    })

    events.rows.forEach(event => {
        logs.push({
            user: 'Système',
            action: 'Événement créé',
            target: event.eventsname,
            date: event.eventsdate
        })
    })

    logs.sort((a, b) => new Date(b.date) - new Date(a.date))

    return logs.slice(0, 20)
}

// export
module.exports = { getDashboard, getProducer, createProducer, deleteProducer, activateProducer, getUser, getUserByEmail, modifyUser, getOrder, getOrderById, modifyOrderStatus, annulOrder, getProduct, getProductById, deactivateProduct, activateProduct, deleteProduct, getEvent, getEventById, createEvent, modifyEvent, deactivateEvent, activateEvent, deleteEvent, getLogs }
