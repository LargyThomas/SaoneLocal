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
        return res.status(200).json({ message: "Producteur désactivé avec succès.", producer })
    } catch (error) {
        if (error.message === 'PRODUCTEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Producteur introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.enableProducer = async (req, res) => {
    try {
        const producer = await adminService.enableProducer(req.params.id)
        return res.status(200).json({ message: "Producteur activé avec succès.", producer })
    } catch (error) {
        if (error.message === 'PRODUCTEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Producteur introuvable." })
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
            return res.status(404).json({ message: "Utilisateur introuvable." })
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
            return res.status(404).json({ message: "Utilisateur introuvable." })
        }
        
        if (error.message === 'ROLE_PRODUCTEUR_INCOHERENT') {
            return res.status(400).json({ message: "Le rôle producteur doit être géré depuis la gestion des producteurs." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getOrders = async (req, res) => {
    try {
        const orders = await adminService.getOrders()
        return res.status(200).json({ orders })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const order = await adminService.getOrderById(req.params.orderId)
        return res.status(200).json({ order })
    } catch (error) {
        if (error.message === 'COMMANDE_NON_TROUVEE') {
            return res.status(404).json({ message: "Commande introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await adminService.updateOrderStatus(req.params.orderId, req.body.ordersStatus)
        return res.status(200).json({ message: "Statut de commande mis à jour avec succès.", order })
    } catch (error) {
        if (error.message === 'COMMANDE_NON_TROUVEE') {
            return res.status(404).json({ message: "Commande introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.cancelOrder = async (req, res) => {
    try {
        const order = await adminService.cancelOrder(req.params.orderId)
        return res.status(200).json({ message: "Commande annulée avec succès.", order })
    } catch (error) {
        if (error.message === 'COMMANDE_NON_TROUVEE') {
            return res.status(404).json({ message: "Commande introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await adminService.getProducts()
        return res.status(200).json({ products })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await adminService.getProductById(req.params.productId)
        return res.status(200).json({ product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ message: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.disableProduct = async (req, res) => {
    try {
        const product = await adminService.disableProduct(req.params.productId)
        return res.status(200).json({ message: "Produit désactivé avec succès.", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ message: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.enableProduct = async (req, res) => {
    try {
        const product = await adminService.enableProduct(req.params.productId)
        return res.status(200).json({ message: "Produit activé avec succès.", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ message: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await adminService.deleteProduct(req.params.productId)
        return res.status(200).json({ message: "Produit supprimé avec succès.", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ message: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getEvents = async (req, res) => {
    try {
        const events = await adminService.getEvents()
        return res.status(200).json({ events })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.getEventById = async (req, res) => {
    try {
        const event = await adminService.getEventById(req.params.eventId)
        return res.status(200).json({ event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ message: "Événement introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.createEvent = async (req, res) => {
    try {
        const event = await adminService.createEvent(req.body)
        return res.status(201).json({ message: "Événement créé avec succès.", event })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const event = await adminService.updateEvent(req.params.eventId, req.body)
        return res.status(200).json({ message: "Événement mis à jour avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ message: "Événement introuvable." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.disableEvent = async (req, res) => {
    try {
        const event = await adminService.disableEvent(req.params.eventId)
        return res.status(200).json({ message: "Événement désactivé avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ message: "Événement introuvable." })
        }
        if (error.message === 'EVENT_STATUS_COLUMN_MISSING') {
            return res.status(400).json({ message: "La colonne eventsStatus doit être ajoutée pour activer ou désactiver un événement." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.enableEvent = async (req, res) => {
    try {
        const event = await adminService.enableEvent(req.params.eventId)
        return res.status(200).json({ message: "Événement activé avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ message: "Événement introuvable." })
        }
        if (error.message === 'EVENT_STATUS_COLUMN_MISSING') {
            return res.status(400).json({ message: "La colonne eventsStatus doit être ajoutée pour activer ou désactiver un événement." })
        }

        console.error(error)
        return res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const event = await adminService.deleteEvent(req.params.eventId)
        return res.status(200).json({ message: "Événement supprimé avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ message: "Événement introuvable." })
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
