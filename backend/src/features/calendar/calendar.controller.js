// require
const {findEvents, findProducerGoEvent, insertGoToEvent, deleteGoToEvent} = require('./calendar.service')

// function

/**
* @description controller of the route GET /api/calendar/ , show the different events and information
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status if there is no error 
*/
const showCalendar = async (req, res) => {
    try {
        const event = await findEvents(req, res);
        const producer = await findProducerGoEvent(req, res);
        res.status(201).json({ message: "Information correctement récupéré", resultevent: event, resultproducer: producer});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route POST /api/calendar/ , add the attendance of the connected producer to the event given
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status if there is no error 
*/
const producerGoToEvent = async (req, res) => {
    try {
        await insertGoToEvent(req, res);
        res.status(201).json({ message: "Information correctement ajouté"});
    } catch (error) {
        if (error.message === 'EVENT_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "l'évenement demandé n'existe pas"});
        }
        if (error.message === 'ALLREADY_GO_TO_EVENT') {
            return res.status(400).json({ message: "Vous allez déjà à cette évènement"});
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route DELETE /api/calendar/ , delete the attendance of the connected producer to the event given
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status if there is no error 
*/
const producerDoNotGoToEvent = async (req, res) => {
    try {
        await deleteGoToEvent(req, res);
        res.status(201).json({ message: "Information correctement supprimé"});
    } catch (error) {
        if (error.message == 'DOES_NOT_GO_TO_EVENT') {
            return res.status(400).json({ message: "Vous n'allez pas à cette evenement"});
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = {showCalendar, producerGoToEvent, producerDoNotGoToEvent}