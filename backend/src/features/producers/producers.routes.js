// producers.routes.js\n// TODO: implement producers routes logic\n\nmodule.exports = {};\n

const express = require('express');

const router = express.Router();

const {AllProducers, ProducerId, ProducerIdProducts} = require('./producers.controller.js')
const {validationId} = require('./producers.validation.js')

// Implement producer routes logic


router.get('/', AllProducers)
router.get('/:id', validationId, ProducerId) // verif si id < 64 caract et est une chaine de caract
router.get('/:id/product', validationId, ProducerIdProducts) // verif si id < 64 caract et est une chaine de caract

module.exports = router