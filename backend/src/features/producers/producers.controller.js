// require
const producerService = require('./producers.service');

// function

/**
* @description controller of the route /api/producer/
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
AllProducers = async (req, res)=> {
    try {
        const result = await producerService.findAllProducer(req, res);
        res.status(201).json({ message: "Information correctement récupéré", result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route /api/producer/:id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
ProducerId = async (req, res)=> {
    try {
        const result = await producerService.findProducerId(req, res);
        res.status(201).json({ message: "Information correctement récupéré", result: result });
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ message: "Informations inaccesibles" });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route /api/producer/:id/product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
ProducerIdProducts = async (req, res)=> {
    try {
        const result = await producerService.findAllProductProducerId(req, res);
        res.status(201).json({ message: "Information correctement récupéré", result:result });
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ message: "Informations inaccesibles" });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = {AllProducers, ProducerId, ProducerIdProducts}