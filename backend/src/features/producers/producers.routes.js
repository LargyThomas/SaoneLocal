// require
const express = require('express');
const authMiddleware = require('../../security/middleware/auth.middleware.js');
const rolesMiddleware = require('../../security/middleware/roles.middleware.js');

const router = express.Router();

const {AllProducers, ProducerId, ProducerIdProducts, ProducerProfil, UpdateProducerProfil} = require('./producers.controller.js')
const {validationId, validationInformationToUpdate} = require('./producers.validation.js')

// Implement producer routes logic

// return all the producers
router.get('/', AllProducers)

// return the private profil of the connected producer
router.get('/profil', authMiddleware, rolesMiddleware(['producteur']), ProducerProfil)

// update private profil of the connected producer
router.patch('/profil', authMiddleware, rolesMiddleware(['producteur']), validationInformationToUpdate, UpdateProducerProfil)

// return all the informations of the producer id
router.get('/:id', validationId, ProducerId)

// return all the products of the producer id
router.get('/:id/product', validationId, ProducerIdProducts)

// export
module.exports = router