// require
const express = require('express');

const router = express.Router();

const {AllProducers, ProducerId, ProducerIdProducts} = require('./producers.controller.js')
const {validationId} = require('./producers.validation.js')

// Implement producer routes logic

// return all the producers
router.get('/', AllProducers)

// return all the informations of the producer id
router.get('/:id', validationId, ProducerId)

// return all the products of the producer id
router.get('/:id/product', validationId, ProducerIdProducts)

// export
module.exports = router