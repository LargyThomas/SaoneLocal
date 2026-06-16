// require

const { connexion } = require('../../database/database.js')

// function

/**
* @description find all the events in the calendar
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findEvents = async (req, res) => {
    const result = await connexion.query("SELECT events.eventsName, events.eventsDate, events.eventsLocation, events.eventsDesc FROM events")
    return result.rows
}

/**
* @description find all the producers that goes to the events in the calendar
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {array of hash} the information collected from the database
*/
const findProducerGoEvent = async (req, res) => {
    const result = await connexion.query("SELECT events.eventsName, events.eventsDate, users.usersEmail, users.usersFirstname, users.usersLastname FROM go_to_events JOIN events ON go_to_events.eventsId = events.eventsId JOIN producer ON go_to_events.producerId = producer.producerId JOIN user_producer ON producer.producerId = user_producer.producerId JOIN users ON user_producer.usersId = users.usersEmail")
    return result.rows
}

/**
* @description Insert in the database the connectection in go_to_event beetween producerId and the eventId given
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {Error} the error
*/
const insertGoToEvent = async (req, res) => {
    let result = await connexion.query("SELECT events.eventsId FROM events WHERE events.eventsId = $1", [req.body.events])
    console.log("test1")
    if (result.rows.length == 0) {
        console.log("event does not exist")
        throw new Error('EVENT_DOES_NOT_EXIST')
    }

    console.log("test2")
    const resultProducerId = await connexion.query("SELECT user_producer.producerId FROM user_producer WHERE user_producer.usersId = $1",[req.user.email])
    result = await connexion.query("SELECT * FROM go_to_events WHERE go_to_events.producerId = $1 AND go_to_events.eventsId = $2", [resultProducerId.rows[0]["producerid"], req.body.events])
    console.log("test3")
    if (result.rows.length != 0) {
        console.log("already go to event")
        throw new Error('ALLREADY_GO_TO_EVENT')
    }
    
    console.log("test4")
    await connexion.query("INSERT INTO go_to_events(producerId, eventsId) VALUES ($1, $2)", [resultProducerId.rows[0]["producerid"], req.body.events])
}

/**
* @description Delete in the database the connectection in go_to_event beetween producerId and the eventId given
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {Error} the error
*/
const deleteGoToEvent = async (req, res) => {
    const resultProducerId = await connexion.query("SELECT user_producer.producerId FROM user_producer WHERE user_producer.usersId = $1",[req.user.email])
    const result = await connexion.query("SELECT * FROM go_to_events WHERE go_to_events.producerId = $1 AND go_to_events.eventsId = $2", [resultProducerId.rows[0]["producerid"], req.body.events])
    if (result.rows.length == 0) {
        throw new Error('DOES_NOT_GO_TO_EVENT')
    }
    
    await connexion.query("DELETE FROM go_to_events WHERE go_to_events.producerId = $1 AND go_to_events.eventsId = $2", [resultProducerId.rows[0]["producerid"], req.body.events])
}

// export
module.exports = {findEvents, findProducerGoEvent, insertGoToEvent, deleteGoToEvent}