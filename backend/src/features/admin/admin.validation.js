const allowedStatus = ['active', 'inactive', 'suspended']

exports.validateProducer = (req, res, next) => {
    const { email, password, gender, lastName, firstName, producerSiretNum, userStatus, producerStatus } = req.body

    if (!email || !password || !gender || !lastName || !firstName || !producerSiretNum) {
        return res.status(400).json({ message: "Tous les champs marqués d'un astérisque sont requis." })
    }

    if (email.length > 50) {
        return res.status(400).json({ message: "L'email ne doit pas dépasser 50 caractères." })
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "L'adresse email est invalide." })
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
        return res.status(400).json({ message: "Le statut du compte est invalide." })
    }

    if (producerStatus !== undefined && !allowedStatus.includes(producerStatus)) {
        return res.status(400).json({ message: "Le statut producteur est invalide." })
    }

    next()
}

exports.validateProducerId = (req, res, next) => {
    const { id } = req.params

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "L'identifiant du producteur est invalide." })
    }

    next()
}

exports.validateUserEmail = (req, res, next) => {
    const { email } = req.params

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "L'adresse email est invalide." })
    }

    next()
}

exports.validateUserUpdate = (req, res, next) => {
    const { usersRole, usersStatus } = req.body

    if (usersRole === undefined || usersRole === null || !usersStatus) {
        return res.status(400).json({ message: "Le rôle et le statut sont requis." })
    }

    if (![1, 2, 3].includes(Number(usersRole))) {
        return res.status(400).json({ message: "Le rôle utilisateur doit être égal à 1, 2 ou 3." })
    }

    if (!allowedStatus.includes(usersStatus)) {
        return res.status(400).json({ message: "Le statut utilisateur est invalide." })
    }

    next()
}