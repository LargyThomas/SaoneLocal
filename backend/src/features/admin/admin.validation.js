const allowedStatus = ['active', 'inactive', 'suspended']
const allowedOrderStatus = ['a', 'n', 'e', 'p', 'r']

exports.validateProducer = (req, res, next) => {
    const { email, password, gender, lastName, firstName, producerSiretNum, userStatus, producerStatus } = req.body

    if (!email || !password || !gender || !lastName || !firstName || !producerSiretNum) {
        return res.status(400).json({ message: "Tous les champs marqués d'un astérisque sont requis." })
    }

    if (email.length > 50) {
        return res.status(400).json({ message: "L'email ne doit pas dépasser 50 caractères." })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Adresse email invalide." })
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères." })
    }

    if (String(gender).length !== 1) {
        return res.status(400).json({ message: "Le genre doit contenir un seul caractère." })
    }

    if (lastName.length > 50 || firstName.length > 50) {
        return res.status(400).json({ message: "Le nom et le prénom ne doivent pas dépasser 50 caractères." })
    }

    if (!/^\d{14}$/.test(String(producerSiretNum))) {
        return res.status(400).json({ message: "Le numéro SIRET doit contenir exactement 14 chiffres." })
    }

    if (userStatus !== undefined && !allowedStatus.includes(userStatus)) {
        return res.status(400).json({ message: "Statut du compte invalide." })
    }

    if (producerStatus !== undefined && !allowedStatus.includes(producerStatus)) {
        return res.status(400).json({ message: "Statut producteur invalide." })
    }

    next()
}

exports.validateProducerId = (req, res, next) => {
    const { id } = req.params

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "Identifiant producteur invalide." })
    }

    next()
}

exports.validateUserEmail = (req, res, next) => {
    const { email } = req.params

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Adresse email invalide." })
    }

    next()
}

exports.validateUserUpdate = (req, res, next) => {
    const { usersRole, usersStatus } = req.body

    if (usersRole === undefined || usersRole === null || !usersStatus) {
        return res.status(400).json({ message: "Le rôle et le statut sont requis." })
    }

    if (![1, 2, 3].includes(Number(usersRole))) {
        return res.status(400).json({ message: "Rôle utilisateur invalide." })
    }

    if (!allowedStatus.includes(usersStatus)) {
        return res.status(400).json({ message: "Statut utilisateur invalide." })
    }

    next()
}

exports.validateOrderId = (req, res, next) => {
    const { orderId } = req.params

    if (!orderId || isNaN(orderId)) {
        return res.status(400).json({ message: "Identifiant commande invalide." })
    }

    next()
}

exports.validateOrderStatus = (req, res, next) => {
    const { ordersStatus } = req.body

    if (!ordersStatus || !allowedOrderStatus.includes(ordersStatus)) {
        return res.status(400).json({ message: "Statut de commande invalide." })
    }

    next()
}

exports.validateProductId = (req, res, next) => {
    const { productId } = req.params

    if (!productId || isNaN(productId)) {
        return res.status(400).json({ message: "Identifiant produit invalide." })
    }

    next()
}

exports.validateEventId = (req, res, next) => {
    const { eventId } = req.params

    if (!eventId || isNaN(eventId)) {
        return res.status(400).json({ message: "Identifiant événement invalide." })
    }

    next()
}

exports.validateEvent = (req, res, next) => {
    const { eventsLocation, eventsDate, eventsName, eventsDesc } = req.body

    if (!eventsLocation || !eventsDate || !eventsName || !eventsDesc) {
        return res.status(400).json({ message: "Tous les champs de l'événement sont requis." })
    }

    if (eventsLocation.length > 100) {
        return res.status(400).json({ message: "Le lieu de l'événement ne doit pas dépasser 100 caractères." })
    }

    if (eventsName.length > 100) {
        return res.status(400).json({ message: "Le nom de l'événement ne doit pas dépasser 100 caractères." })
    }

    if (eventsDesc.length > 1500) {
        return res.status(400).json({ message: "La description de l'événement ne doit pas dépasser 1500 caractères." })
    }

    if (isNaN(Date.parse(eventsDate))) {
        return res.status(400).json({ message: "Date de l'événement invalide." })
    }

    next()
}
