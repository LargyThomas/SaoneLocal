const adminService = require('./admin.service')

exports.getDashboard = async (req, res) => {
    try {
        const dashboard = await adminService.getDashboard()
        return res.status(200).json({ dashboard })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getProducers = async (req, res) => {
    try {
        const producers = await adminService.getProducers()
        return res.status(200).json({ producers })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.createProducer = async (req, res) => {
    try {
        const producer = await adminService.createProducer(req.body)
        return res.status(201).json({ message: "Producteur créé avec succès.", producer })
    } catch (error) {
        if (error.message === 'EMAIL_EXISTE_DEJA') {
            return res.status(409).json({ message: "Cet email est déjà utilisé." })
        }

        if (error.message === 'SIRET_EXISTE_DEJA') {
            return res.status(409).json({ message: "Ce numéro SIRET est déjà utilisé." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.deleteProducer = async (req, res) => {
    try {
        const producer = await adminService.deleteProducer(req.params.id)
        return res.status(200).json({ message: "Producteur supprimé avec succès.", producer })
    } catch (error) {
        if (error.message === 'PRODUCTEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Producteur non trouvé." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await adminService.getUsers()
        return res.status(200).json({ users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await adminService.getUserByEmail(req.params.email)
        return res.status(200).json({ user })
    } catch (error) {
        if (error.message === 'UTILISATEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Utilisateur non trouvé." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await adminService.updateUser(req.params.email, req.body)
        return res.status(200).json({ message: "Utilisateur mis à jour avec succès.", user })
    } catch (error) {
        if (error.message === 'UTILISATEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Utilisateur non trouvé." })
        }
        
        if (error.message === 'ROLE_PRODUCTEUR_INCOHERENT') {
            return res.status(400).json({ message: "Un rôle producteur doit être géré depuis la gestion des producteurs." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getLogs = async (req, res) => {
    try {
        const logs = await adminService.getLogs()
        return res.status(200).json({ logs })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}