// const
const ALLOWED_STATUS = ['active', 'inactive', 'suspended']
const ALLOWED_ORDER_STATUS = ['a', 'n', 'e', 'p', 'r']

// function

/**
* @description Check if the informations for the new producer are correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateProducer = (req, res, next) => {
    const { email, password, gender, lastName, firstName, producerSiretNum, userStatus, producerStatus } = req.body

    if (!email || !password || !gender || !lastName || !firstName || !producerSiretNum) {
        return res.status(400).json({ error: "Tous les champs marqués d'un astérisque sont requis." })
    }

    if (email.length > 50) {
        return res.status(400).json({ error: "L'email ne doit pas dépasser 50 caractères." })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Adresse email invalide." })
    }

    if (password.length < 8) {
        return res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." })
    }

    if (String(gender).length !== 1) {
        return res.status(400).json({ error: "Le genre doit contenir un seul caractère." })
    }

    if (lastName.length > 50 || firstName.length > 50) {
        return res.status(400).json({ error: "Le nom et le prénom ne doivent pas dépasser 50 caractères." })
    }

    if (!/^\d{14}$/.test(String(producerSiretNum))) {
        return res.status(400).json({ error: "Le numéro SIRET doit contenir exactement 14 chiffres." })
    }

    if (userStatus !== undefined && !ALLOWED_STATUS.includes(userStatus)) {
        return res.status(400).json({ error: "Statut du compte invalide." })
    }

    if (producerStatus !== undefined && !ALLOWED_STATUS.includes(producerStatus)) {
        return res.status(400).json({ error: "Statut producteur invalide." })
    }

    next()
}

/**
* @description Check if the id of the producer is correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateProducerId = (req, res, next) => {
    const { id } = req.params

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Identifiant producteur invalide." })
    }

    next()
}

/**
* @description Check if the email of the user is correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateUserEmail = (req, res, next) => {
    const { email } = req.params

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ error: "Adresse email invalide." })
    }

    next()
}

/**
* @description Check if the user informations to update are correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateUserUpdate = (req, res, next) => {
    const { usersRole, usersStatus } = req.body

    if (usersRole === undefined || usersRole === null || !usersStatus) {
        return res.status(400).json({ error: "Le rôle et le statut sont requis." })
    }

    if (![1, 2, 3].includes(Number(usersRole))) {
        return res.status(400).json({ error: "Rôle utilisateur invalide." })
    }

    if (!ALLOWED_STATUS.includes(usersStatus)) {
        return res.status(400).json({ error: "Statut utilisateur invalide." })
    }

    next()
}

/**
* @description Check if the id of the order is correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateOrderId = (req, res, next) => {
    const { orderId } = req.params

    if (!orderId || isNaN(orderId)) {
        return res.status(400).json({ error: "Identifiant commande invalide." })
    }

    next()
}

/**
* @description Check if the order status to update is correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateOrderStatus = (req, res, next) => {
    const { ordersStatus } = req.body

    if (!ordersStatus || !ALLOWED_ORDER_STATUS.includes(ordersStatus)) {
        return res.status(400).json({ error: "Statut de commande invalide." })
    }

    next()
}

/**
* @description Check if the id of the product is correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateProductId = (req, res, next) => {
    const { productId } = req.params

    if (!productId || isNaN(productId)) {
        return res.status(400).json({ error: "Identifiant produit invalide." })
    }

    next()
}

/**
* @description Check if the id of the event is correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateEventId = (req, res, next) => {
    const { eventId } = req.params

    if (!eventId || isNaN(eventId)) {
        return res.status(400).json({ error: "Identifiant événement invalide." })
    }

    next()
}

/**
* @description Check if the event informations to update are correct
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validateEvent = (req, res, next) => {
    const { eventsLocation, eventsDate, eventsName, eventsDesc } = req.body

    if (!eventsLocation || !eventsDate || !eventsName || !eventsDesc) {
        return res.status(400).json({ error: "Tous les champs de l'événement sont requis." })
    }

    if (eventsLocation.length > 100) {
        return res.status(400).json({ error: "Le lieu de l'événement ne doit pas dépasser 100 caractères." })
    }

    if (eventsName.length > 100) {
        return res.status(400).json({ error: "Le nom de l'événement ne doit pas dépasser 100 caractères." })
    }

    if (eventsDesc.length > 1500) {
        return res.status(400).json({ error: "La description de l'événement ne doit pas dépasser 1500 caractères." })
    }

    if (isNaN(Date.parse(eventsDate))) {
        return res.status(400).json({ error: "Date de l'événement invalide." })
    }

    next()
}

// export
module.exports = { validateProducer, validateProducerId, validateUserEmail, validateUserUpdate, validateOrderId, validateOrderStatus, validateProductId, validateEventId, validateEvent }