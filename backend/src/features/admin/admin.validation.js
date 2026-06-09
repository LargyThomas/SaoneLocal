exports.validateProducer = (req, res, next) => {
    const { name, siret, status } = req.body
    
    if (!name || !siret || !status) {
        return res.status(400).json({ message: "Tous les champs marqués d'un astérisque sont requis." })
    }

    next()
}

exports.validateProduct = (req, res, next) => {
    const { produitId, producerId, category, name, price, description, status } = req.body

    if (!produitId || !producerId || !category || !name || !price || !description || !status) {
        return res.status(400).json({ message: "Tous les champs marqués d'un astérique sont requis." })
    }

    next()
}

exports.validateUser = (req, res, next) => {
    const { email, password, gender, name, creation, connexion, role, status } = req.body

    if (!email|| !password || !gender || !name || !creation || !connexion || !role || !status) {
        return res.status(400).json({ message: "Tous les champs marqués d'un astérique sont requis." })
    }

    next()
}