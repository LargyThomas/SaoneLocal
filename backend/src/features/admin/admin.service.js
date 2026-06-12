const { connexion } = require('../../database/database.js')
const { hashPassword } = require('../../security/crypto.js')

const createProducer = async ({ email, password, gender, lastName, firstName, producerDesc, producerLocalisation, producerSiretNum, userStatus = 'active', producerStatus = 'active' }) => {
    const existingUser = await connexion.query('SELECT usersEmail FROM users WHERE usersEmail = $1', [email])

    if (existingUser.rows.length > 0) {
        throw new Error('EMAIL_EXISTE_DEJA')
    }

    const existingProducer = await connexion.query('SELECT producerId FROM producer WHERE producerSiretNum = $1', [producerSiretNum])

    if (existingProducer.rows.length > 0) {
        throw new Error('SIRET_EXISTE_DEJA')
    }

    const hashedPassword = await hashPassword(password)
    const user = await connexion.query('INSERT INTO users (usersEmail, usersPassword, usersGender, usersLastname, usersFirstname, usersCreationDate, usersLastConnexion, usersRole, usersStatus) VALUES ($1, $2, $3, $4, $5, NOW(), NOW(), $6, $7) RETURNING usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersCreationDate', [email, hashedPassword, gender, lastName, firstName, 2, userStatus])
    const producer = await connexion.query('INSERT INTO producer (producerDesc, producerLocalisation, producerSiretNum, producerStatus) VALUES ($1, $2, $3, $4) RETURNING *', [producerDesc || null, producerLocalisation || null, producerSiretNum, producerStatus])

    await connexion.query('INSERT INTO user_producer (usersId, producerId) VALUES ($1, $2)', [email, producer.rows[0].producerid])

    return { user: user.rows[0], producer: producer.rows[0] }
}

const deleteProducer = async (producerId) => {
    const producer = await connexion.query('SELECT p.producerId, p.producerSiretNum, up.usersId FROM producer p LEFT JOIN user_producer up ON up.producerId = p.producerId WHERE p.producerId = $1', [producerId])

    if (producer.rows.length === 0) {
        throw new Error('PRODUCTEUR_NON_TROUVE')
    }

    await connexion.query('UPDATE producer SET producerStatus = $1 WHERE producerId = $2', ['inactive', producerId])

    if (producer.rows[0].usersid) {
        await connexion.query('UPDATE users SET usersStatus = $1 WHERE usersEmail = $2', ['inactive', producer.rows[0].usersid])
    }

    return {
        producerId: producer.rows[0].producerid,
        producerSiretNum: producer.rows[0].producersiretnum,
        producerStatus: 'inactive',
        usersEmail: producer.rows[0].usersid,
        usersStatus: producer.rows[0].usersid ? 'inactive' : null
    }
}

const getProducers = async () => {
    const producers = await connexion.query('SELECT p.*, up.usersId, u.usersFirstname, u.usersLastname, u.usersCreationDate, u.usersStatus FROM producer p LEFT JOIN user_producer up ON up.producerId = p.producerId LEFT JOIN users u ON u.usersEmail = up.usersId ORDER BY p.producerId DESC')
    return producers.rows
}

const getDashboard = async () => {
    const users = await connexion.query('SELECT COUNT(*) AS total FROM users')
    const producers = await connexion.query('SELECT COUNT(*) AS total FROM producer')
    const orders = await connexion.query('SELECT COUNT(*) AS total FROM orders')
    const revenue = await connexion.query('SELECT COALESCE(SUM(ordersTotalCost), 0) AS total FROM orders')

    const recentOrders = await connexion.query('SELECT o.ordersId, o.ordersStatus, o.ordersTotalCost, o.ordersDate, u.usersFirstname, u.usersLastname FROM orders o JOIN users u ON u.usersEmail = o.usersId ORDER BY o.ordersDate DESC, o.ordersId DESC LIMIT 5')
    const newUsers = await connexion.query('SELECT usersEmail, usersFirstname, usersLastname, usersRole, usersStatus, usersCreationDate FROM users ORDER BY usersCreationDate DESC LIMIT 5')
    const ordersDistribution = await connexion.query('SELECT ordersStatus, COUNT(*) AS total FROM orders GROUP BY ordersStatus ORDER BY ordersStatus')
    const ordersEvolution = await connexion.query('SELECT ordersDate, COUNT(*) AS total FROM orders GROUP BY ordersDate ORDER BY ordersDate ASC LIMIT 31')

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

const getUsers = async () => {
    const users = await connexion.query('SELECT usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersProfilPicture, usersCreationDate, usersLastConnexion FROM users ORDER BY usersCreationDate DESC')
    return users.rows
}

const getUserByEmail = async (email) => {
    const user = await connexion.query('SELECT usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersProfilPicture, usersCreationDate, usersLastConnexion FROM users WHERE usersEmail = $1', [email])

    if (user.rows.length === 0) {
        throw new Error('UTILISATEUR_NON_TROUVE')
    }

    return user.rows[0]
}

const updateUser = async (email, { usersRole, usersStatus }) => {
    const existingUser = await connexion.query('SELECT usersRole FROM users WHERE usersEmail = $1', [email])

    if (existingUser.rows.length === 0) {
        throw new Error('UTILISATEUR_NON_TROUVE')
    }

    const currentRole = Number(existingUser.rows[0].usersrole)
    const newRole = Number(usersRole)

    if ((currentRole === 2 || newRole === 2) && currentRole !== newRole) {
        throw new Error('ROLE_PRODUCTEUR_INCOHERENT')
    }

    const user = await connexion.query('UPDATE users SET usersRole = $1, usersStatus = $2 WHERE usersEmail = $3 RETURNING usersEmail, usersGender, usersLastname, usersFirstname, usersRole, usersStatus, usersProfilPicture, usersCreationDate, usersLastConnexion', [usersRole, usersStatus, email])

    return user.rows[0]
}

const getLogs = async () => {
    const usersCreated = await connexion.query('SELECT usersFirstname, usersLastname, usersEmail, usersCreationDate FROM users ORDER BY usersCreationDate DESC LIMIT 5')
    const usersConnected = await connexion.query('SELECT usersFirstname, usersLastname, usersEmail, usersLastConnexion FROM users ORDER BY usersLastConnexion DESC LIMIT 5')
    const orders = await connexion.query('SELECT o.ordersId, o.ordersDate, u.usersFirstname, u.usersLastname FROM orders o JOIN users u ON u.usersEmail = o.usersId ORDER BY o.ordersDate DESC LIMIT 5')
    const events = await connexion.query('SELECT eventsName, eventsDate FROM events ORDER BY eventsDate DESC LIMIT 5')

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

module.exports = { getDashboard, getProducers, createProducer, deleteProducer, getUsers, getUserByEmail, updateUser, getLogs }