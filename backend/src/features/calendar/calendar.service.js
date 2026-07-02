// require

const { connexion } = require('../../database/database.js')

// function

/**
* @description find all the events in the calendar
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findEvent = async (req, res) => {
    const result = await connexion.query(`
        SELECT events.eventsName, events.eventsDate, events.eventsLocation, events.eventsDesc 
        FROM events
    `)

    return result.rows
}

/**
* @description find all the producers that goes to the events in the calendar
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findProducerGoEvent = async (req, res) => {
    const result = await connexion.query(`
        SELECT events.eventsName, events.eventsDate, users.usersEmail, users.usersFirstname, users.usersLastname
        FROM go_to_events
        JOIN events ON go_to_events.eventsId = events.eventsId
        JOIN user_producer ON go_to_events.producerId = user_producer.producerId
        JOIN users ON user_producer.usersId = users.usersEmail
    `)
    return result.rows
}

/**
* @description Insert in the database the connection in go_to_event beetween producerId and the eventId given
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {Error} the error
*/
const insertGoToEvent = async (req, res) => {
    let result = await connexion.query(
        `SELECT events.eventsId 
        FROM events 
        WHERE events.eventsId = $1
    `,  [req.body.events])
    
    if (result.rows.length == 0) {
        throw new Error('EVENT_DOES_NOT_EXIST')
    }

    result = await connexion.query(`
        SELECT producerId
        FROM user_producer
        WHERE usersId = $1
    `,  [req.user.email])
    if (result.rows.length == 0) {
        throw new Error('PRODUCER_DOES_NOT_EXIST')
    }

    const producerId = result.rows[0]["producerid"]

    result = await connexion.query(`
        SELECT *
        FROM go_to_events
        WHERE go_to_events.producerId = $1
        AND go_to_events.eventsId = $2
    `,  [producerId, req.body.events])
    if (result.rows.length != 0) {
        throw new Error('ALLREADY_GO_TO_EVENT')
    }
    
    await connexion.query(`
        INSERT INTO go_to_events(producerId, eventsId)
        VALUES ($1, $2)
    `,  [producerId, req.body.events])
}

/**
* @description Delete in the database the connection in go_to_event beetween producerId and the eventId given
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {Error} the error
*/
const deleteGoToEvent = async (req, res) => {
    let result = await connexion.query(`
        SELECT producerId
        FROM user_producer
        WHERE usersId = $1
    `,  [req.user.email])
    if (result.rows.length == 0) {
        throw new Error('PRODUCER_DOES_NOT_EXIST')
    }

    const producerId = result.rows[0]["producerid"]

    result = await connexion.query(`
        SELECT *
        FROM go_to_events
        WHERE go_to_events.producerId = $1
        AND go_to_events.eventsId = $2
    `,  [producerId, req.body.events])
    if (result.rows.length == 0) {
        throw new Error('DOES_NOT_GO_TO_EVENT')
    }
    
    await connexion.query(`
        DELETE FROM go_to_events
        WHERE go_to_events.producerId = $1
        AND go_to_events.eventsId = $2
    `,  [producerId, req.body.events])
}

// export
module.exports = { findEvent, findProducerGoEvent, insertGoToEvent, deleteGoToEvent }
