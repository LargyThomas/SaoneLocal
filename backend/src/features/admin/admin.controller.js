// require
const { getDashboard, getProducer, createProducer, deleteProducer, activateProducer, getUser, getUserByEmail, modifyUser, getOrder, getOrderById, modifyOrderStatus, annulOrder, getProduct, getProductById, deactivateProduct, activateProduct, deleteProduct, getEvent, getEventById, createEvent, modifyEvent, deactivateEvent, activateEvent, deleteEvent, getLogs } = require('./admin.service')

// function

/**
* @description controller of the route GET /api/admin/dashboard , show the Dashboard
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showDashboard = async (req, res) => {
    try {
        const dashboard = await getDashboard()
        return res.status(200).json({message: "Information correctement récupéré", dashboard })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/producers , show the informations of all the producers
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showProducer = async (req, res) => {
    try {
        const producers = await getProducer()
        return res.status(200).json({ message: "Information correctement récupéré", producers })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route POST /api/admin/producers , create a new producer account
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the added producer if there is no error 
*/
const addProducer = async (req, res) => {
    try {
        const producer = await createProducer(req.body)
        return res.status(201).json({ message: "Producteur créé avec succès.", producer })
    } catch (error) {
        if (error.message === 'EMAIL_EXISTE_DEJA') {
            return res.status(409).json({ error: "Cet email est déjà utilisé." })
        }

        if (error.message === 'SIRET_EXISTE_DEJA') {
            return res.status(409).json({ error: "Ce numéro SIRET est déjà utilisé." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route DELETE /api/admin/producers/:id , delete a producer account
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the deleted producer if there is no error 
*/
const removeProducer = async (req, res) => {
    try {
        const producer = await deleteProducer(req.params.id)
        return res.status(200).json({ message: "Producteur désactivé avec succès.", producer })
    } catch (error) {
        if (error.message === 'PRODUCTEUR_NON_TROUVE') {
            return res.status(404).json({ error: "Producteur introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PATCH /api/admin/producers/:id/enable , activate the id producer account 
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the activated producer if there is no error 
*/
const enableProducer = async (req, res) => {
    try {
        const producer = await activateProducer(req.params.id)
        return res.status(200).json({ message: "Producteur activé avec succès.", producer })
    } catch (error) {
        if (error.message === 'PRODUCTEUR_NON_TROUVE') {
            return res.status(404).json({ error: "Producteur introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/users , show the information of all the users
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showUser = async (req, res) => {
    try {
        const users = await getUser()
        return res.status(200).json({ message: "Information correctement récupéré", users })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/users/:email , show the information of the id user 
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showUserByEmail = async (req, res) => {
    try {
        const user = await getUserByEmail(req.params.email)
        return res.status(200).json({ message:"Information correctement récupéré" ,user })
    } catch (error) {
        if (error.message === 'UTILISATEUR_NON_TROUVE') {
            return res.status(404).json({ error: "Utilisateur introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PUT /api/admin/users/:email , update the account of the id producer
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the updated producer if there is no error 
*/
const updateUser = async (req, res) => {
    try {
        const user = await modifyUser(req.params.email, req.body)
        return res.status(200).json({ message: "Utilisateur mis à jour avec succès.", user })
    } catch (error) {
        if (error.message === 'UTILISATEUR_NON_TROUVE') {
            return res.status(404).json({ error: "Utilisateur introuvable." })
        }
        
        if (error.message === 'ROLE_PRODUCTEUR_INCOHERENT') {
            return res.status(400).json({ error: "Le rôle producteur doit être géré depuis la gestion des producteurs." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/orders , show the informations of all the orders
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showOrder = async (req, res) => {
    try {
        const orders = await getOrder()
        return res.status(200).json({ message:"Information correctement récupéré", orders })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /orders/:orderId , show the informations of the id orders
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showOrderById = async (req, res) => {
    try {
        const order = await getOrderById(req.params.orderId)
        return res.status(200).json({ message:"Information correctement récupéré", order })
    } catch (error) {
        if (error.message === 'COMMANDE_NON_TROUVEE') {
            return res.status(404).json({ message: "Commande introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PATCH /api/admin/orders/:orderId/status , update the status of the order
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected of the update order if there is no error 
*/
const updateOrderStatus = async (req, res) => {
    try {
        const order = await modifyOrderStatus(req.params.orderId, req.body.ordersStatus)
        return res.status(200).json({ message: "Statut de commande mis à jour avec succès.", order })
    } catch (error) {
        if (error.message === 'COMMANDE_NON_TROUVEE') {
            return res.status(404).json({ error: "Commande introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PATCH /api/admin/orders/:orderId/cancel , cancel the order
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected of the canceled order if there is no error 
*/
const cancelOrder = async (req, res) => {
    try {
        const order = await annulOrder(req.params.orderId)
        return res.status(200).json({ message: "Commande annulée avec succès.", order })
    } catch (error) {
        if (error.message === 'COMMANDE_NON_TROUVEE') {
            return res.status(404).json({ error: "Commande introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/products , show the information of all the products
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showProducts = async (req, res) => {
    try {
        const products = await getProduct()
        return res.status(200).json({ message:"Information correctement récupéré", products })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/products/:productId , show the information of all the product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showProductById = async (req, res) => {
    try {
        const product = await getProductById(req.params.productId)
        return res.status(200).json({ message:"Information correcTement récupéré", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ error: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PATCH /api/admin/products/:productId/disable , deactivate the productId product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the deactivated product if there is no error 
*/
const disableProduct = async (req, res) => {
    try {
        const product = await deactivateProduct(req.params.productId)
        return res.status(200).json({ message: "Produit désactivé avec succès.", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ error: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PATCH /api/admin/products/:productId/enable , activate the productId product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the enabled product if there is no error 
*/
const enableProduct = async (req, res) => {
    try {
        const product = await activateProduct(req.params.productId)
        return res.status(200).json({ message: "Produit activé avec succès.", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ error: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route DELETE /api/admin/products/:productId , delete the productId product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the deleted product if there is no error 
*/
const removeProduct = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.productId)
        return res.status(200).json({ message: "Produit supprimé avec succès.", product })
    } catch (error) {
        if (error.message === 'PRODUIT_NON_TROUVE') {
            return res.status(404).json({ error: "Produit introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/events , show the information of all the events
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showEvent = async (req, res) => {
    try {
        const events = await getEvent()
        return res.status(200).json({ message:"Information correctement récupéré", events })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/events/:eventId , show the information of the eventId event
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const showEventById = async (req, res) => {
    try {
        const event = await getEventById(req.params.eventId)
        return res.status(200).json({ message:"Information correctement récupéré", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ error: "Événement introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route POST /api/admin/events , create a new event
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the created event if there is no error 
*/
const addEvent = async (req, res) => {
    try {
        const event = await createEvent(req.body)
        return res.status(201).json({ message: "Événement créé avec succès.", event })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PUT /api/admin/events/:eventId , update the eventId event
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the updated event if there is no error 
*/
const updateEvent = async (req, res) => {
    try {
        const event = await modifyEvent(req.params.eventId, req.body)
        return res.status(200).json({ message: "Événement mis à jour avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ message: "Événement introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PATCH /api/admin/events/:eventId/disable , deactivate the eventId event
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the deactivated event if there is no error 
*/
const disableEvent = async (req, res) => {
    try {
        const event = await deactivateEvent(req.params.eventId)
        return res.status(200).json({ message: "Événement désactivé avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ error: "Événement introuvable." })
        }
        if (error.message === 'EVENT_STATUS_COLUMN_MISSING') {
            return res.status(400).json({ error: "La colonne eventsStatus doit être ajoutée pour activer ou désactiver un événement." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route PATCH /api/admin/events/:eventId/enable , activate the eventId event
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the enable event if there is no error 
*/
const enableEvent = async (req, res) => {
    try {
        const event = await activateEvent(req.params.eventId)
        return res.status(200).json({ message: "Événement activé avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ error: "Événement introuvable." })
        }
        if (error.message === 'EVENT_STATUS_COLUMN_MISSING') {
            return res.status(400).json({ error: "La colonne eventsStatus doit être ajoutée pour activer ou désactiver un événement." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route DELETE /api/admin/events/:eventId , delete the eventId event
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the deleted event if there is no error 
*/
const removeEvent = async (req, res) => {
    try {
        const event = await deleteEvent(req.params.eventId)
        return res.status(200).json({ message: "Événement supprimé avec succès.", event })
    } catch (error) {
        if (error.message === 'EVENEMENT_NON_TROUVE') {
            return res.status(404).json({ error: "Événement introuvable." })
        }

        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

/**
* @description controller of the route GET /api/admin/logs , show all the logs
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information of the deleted product if there is no error 
*/
const showLogs = async (req, res) => {
    try {
        const logs = await getLogs()
        return res.status(200).json({ message: "Information correctement récupéré", logs })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." })
    }
}

// export
module.exports = { showDashboard, showProducer, addProducer, removeProducer, enableProducer, showUser, showUserByEmail, updateUser, showOrder, showOrderById, updateOrderStatus, cancelOrder, showProducts, showProductById, disableProduct, enableProduct, removeProduct, showEvent, showEventById, addEvent, updateEvent, disableEvent, enableEvent, removeEvent, showLogs }