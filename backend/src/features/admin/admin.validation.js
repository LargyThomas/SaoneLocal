// const
const ALLOWED_STATUS = ['active', 'inactive', 'suspended']
const ALLOWED_ORDER_STATUS = ['a', 'n', 'e', 'p', 'r']

const HASH_UPDATE = {"usersPassword": 64, "usersGender": 1, "usersLastname": 50, "usersFirstname": 50, "usersProfilPicture": 500, "associationLocationOffice": 100, "associationValues": 1500, "associationTestimony": 1500, "associationDescHome": 1500, "associationDescAbout": 1500, "associationEmail": 50, "associationNum": 15}
const HASH_GENDER = {"M": "ok", "F": "ok", "A": "ok"}

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

/**
* @description Check if the given key to update is valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const verifyKey = (req, res) => {
    if (req.body.key == null || req.body.value == null) {
        throw new Error('MISSING_INFORMATION')
    }
    if (HASH_UPDATE[req.body.key] == null) {
        throw new Error('NO_PERMISSION')
    }
}

/**
* @description Check if the given value to update is valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const verifyValue = (req, res) => {
    if (req.body.value.length > HASH_UPDATE[req.body.key]) {
        throw new Error('TOO_MANY_CHARACTER')
    }

    if (!isNaN(parseInt(req.body.value))) {
        throw new Error('NUMBER_GIVEN')
    }

    if (req.body.key == "usersGender" && HASH_GENDER[req.body.value] == null) {
        throw new Error('INVALID_INFORMATION')
    }

    if (req.body.key == "usersPassword") {
        const hasUpperCase = /[A-Z]/.test(req.body.value);
        const hasLowerCase = /[a-z]/.test(req.body.value);
        const hasNumber = /[0-9]/.test(req.body.value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(req.body.value);

        if (req.body.value.length < 8 || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
            throw new Error('INVALID_PASSWORD')
        }
    }
}

/**
* @description Check if the information given to update are valid
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @param {Function: next} next, the next function
* @return {Function: next} or {Error} the next function or an error if the id is not valid
*/
const validationInformationToUpdate = (req, res, next) => {
    try {
        verifyKey(req, res)
        verifyValue(req,res)
        next();
    } catch (error) {
        if (error.message == 'NUMBER_GIVEN') {
            return res.status(400).json({ message: "La valeur doit être une chaîne de caractères" });
        }
        if (error.message == 'INVALID_INFORMATION') {
            return res.status(400).json({ message: "Information invalide" });
        }
        if (error.message == 'MISSING_INFORMATION') {
            return res.status(400).json({ message: "Les valeurs key et value doivent être renseignées" });
        }
        if (error.message == 'NO_PERMISSION') {
            return res.status(423).json({ message: "Vous n'avez pas la permission de modifier ce champ" });
        }
        if (error.message == 'TOO_MANY_CHARACTER') {
            return res.status(400).json({ message: "Le champ contient un trop grand nombre de caractères" });
        }
        if (error.message == 'INVALIDE_PASSWORD') {
            return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères et inclure au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial." });
        }
        console.log(error.message)  
    }
}

// export
module.exports = { validateProducer, validateProducerId, validateUserEmail, validateUserUpdate, validateOrderId, validateOrderStatus, validateProductId, validateEventId, validateEvent, validationInformationToUpdate }