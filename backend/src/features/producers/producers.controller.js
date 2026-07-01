// require
const { findAllProducer, findProducerId, findProductProducerIdPage, findEventProducerIdPage, findAllProductProducerId, findProfilUser, findProfilProduct, findProfilOrder, findProfilStatistic, updateProducerInformation } = require('./producers.service.js');

// function

/**
* @description controller of the route GET /api/producer/
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const allProducer = async (req, res)=> {
    try {
        const result = await findAllProducer(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route GET /api/producer/:id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const producerId = async (req, res)=> {
    try {
        const result = await findProducerId(req, res);
        const product = await findProductProducerIdPage(req, res, 9);
        const event = await findEventProducerIdPage(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", resultProducer: result, resultProduct: product, resultEvent: event });
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ error: "L'id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ error: "Informations inaccessibles." });
        }
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route GET /api/producer/:id/product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const producerIdProduct = async (req, res)=> {
    try {
        const result = await findAllProductProducerId(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", result: result });
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ error: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ error: "Informations inaccessibles." });
        }
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route GET /api/producer/profil
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
const producerProfil = async (req,res)=>{
    try {
        const user = await findProfilUser(req, res);
        const product = await findProfilProduct(req, res);
        const order = await findProfilOrder(req, res);
        const statistique = await findProfilStatistic(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", resultUser: user, resultProduct: product, resultOrder: order, resultStatistique: statistique });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route PATCH /api/producer/profil
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
const updateProducerProfil = async (req, res)=>{
    try {
        await updateProducerInformation(req, res);
        res.status(201).json({ message: "Information correctement modifiée." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = { allProducer, producerId, producerIdProduct, producerProfil, updateProducerProfil }
