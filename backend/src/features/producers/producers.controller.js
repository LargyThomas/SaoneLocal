// require
const producerService = require('./producers.service');

// function

/**
* @description controller of the route get /api/producer/
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
AllProducers = async (req, res)=> {
    try {
        const result = await producerService.findAllProducer(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route get /api/producer/:id
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
ProducerId = async (req, res)=> {
    try {
        const result = await producerService.findProducerId(req, res);
        const product = await producerService.findProductProducerIdPage(req, res, 9);
        const event = await producerService.findProductEventIdPage(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", resultProducer: result, resultProduct: product, resultEvent: event});
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ message: "Informations inaccessibles." });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route get /api/producer/:id/product
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
ProducerIdProducts = async (req, res)=> {
    try {
        const result = await producerService.findAllProductProducerId(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", result:result });
    } catch (error) {
        if (error.message === 'THIS_ID_DOES_NOT_EXIST') {
            return res.status(404).json({ message: "L'Id demandé n'existe pas" });
        }
        if (error.message === 'PRODUCER_NOT_ACTIVE') {
            return res.status(423).json({ message: "Informations inaccessibles." });
        }
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route get /api/producer/profil
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status and the information collected from the database if there is no error 
*/
ProducerProfil = async (req,res)=>{
    try {
        const user = await producerService.findProfilUser(req, res);
        const product = await producerService.findProfilProduct(req, res);
        const order = await producerService.findProfilOrder(req, res);
        const statistique = await producerService.findProfilStatistique(req, res);
        res.status(201).json({ message: "Informations correctement récupérées.", "resultuser":user, "resultproduct": product, "resultorder": order, "resultstatistique": statistique});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

/**
* @description controller of the route patch /api/producer/profil
* @param {hash} req, the request
* @param {hash} res, the response of the request
* @return {status} and {json} a message for the status 
*/
UpdateProducerProfil = async (req, res)=>{
    try {
        await producerService.UpdateProducerInformation(req, res);
        res.status(201).json({ message: "Information correctement modifiée."});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
    }
}

// export
module.exports = {AllProducers, ProducerId, ProducerIdProducts, ProducerProfil, UpdateProducerProfil}
