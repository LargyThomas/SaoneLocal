const adminService = require('./admin.service')

exports.createProducer = async (req, res) => {
    try {
        const producer = await adminService.createProducer(req.body)
        res.status(201).json({ message: "Producteur créé avec succès.", producer })
    } catch (error) {
        if (error.message === 'SIRET_EXISTE_DEJA') {
            return res.status(409).json({ message: "Ce numéro SIRET est déjà utilisé." })
        }
        console.error(error)
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.deleteProducer = async (req, res) => {
    try {
        const producer = await adminService.deleteProducer(req.params.id)
        res.status(201).json({ message: "Producteur supprimé avec succès.", producer })
    } catch (error) {
        if (error.message === 'PRODUCTEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Producteur non trouvé."})
        }
        console.error(error)
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

exports.updateProducer = async (req, res) => {
    try {
        const producer = await adminService.updateProducer(req.body, req.params.id)
        res.status(201).json({ message: "Producteur mis à jour avec succès.", producer})
    } catch (error) {
        if (error.message === 'PRODUCTEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Producteur non trouvé."})
        }
        if (error.message === 'SIRET_EXISTE_DEJA') {
            return res.status(409).json({ message: "Ce numéro SIRET est déjà utilisé." })
        }
    }
    console.error(error)
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
}


exports.deleteProduct = async (req, res) => {
    try {
        const product = await proudctService.deleteProduct(req.params.id)
        res.status(201).json({ message: "Produit supprimé avec succès.", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ message: "Produit non trouvé."})
        }
    }
    console.error(error)
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await produitService.updateProduct(req.body, req.params.id)
        res.status(201).json({ message: "Produit mis à jour avec succès.", product})
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ message: "Produit non trouvé."})
        }
    }
    console.error(error)
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await adminService.deleteUser(req.params.id)
        res.status(201).json({ message: "Utilisateur supprimé avec succès.", user})
    } catch (error) {
        if (error.message === 'UTILISATEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Utilisateur non trouvé." })
        }
    }
    console.error(error)
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
}

exports.updateUser = async (req, res) => {
    try {
        const user = await adminService.updateUser(req.body, req.params.id)
        res.status(201).json({ message: "Utilisateur mis à jour avec succès.", user })
    } catch (error) {
        if (error.message === 'UTILISATEUR_NON_TROUVE') {
            return res.status(404).json({ message: "Utilisateur non trouvé." })
        }
    }
    console.error(error)
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." })
}