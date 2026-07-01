// require
const express = require('express');
const router = express.Router();

const authMiddleware = require('../../security/middleware/auth.middleware.js');
const rolesMiddleware = require('../../security/middleware/roles.middleware.js');
const { allProducer, producerId, producerIdProduct, producerProfil, updateProducerProfil } = require('./producers.controller.js')
const { validationId, validationInformationToUpdate } = require('./producers.validation.js')

// Implementation of the routes logic for the producers

// return all the producers
router.get('/', allProducer)

// return the private profil of the connected producer
router.get('/profil', authMiddleware, rolesMiddleware(['producteur']), producerProfil)

// update private profil of the connected producer
router.patch('/profil', authMiddleware, rolesMiddleware(['producteur']), validationInformationToUpdate, updateProducerProfil)

// return all the information of the producer id
router.get('/:id', validationId, producerId)

// return all the products of the producer id
router.get('/:id/product', validationId, producerIdProduct)

// export
module.exports = router