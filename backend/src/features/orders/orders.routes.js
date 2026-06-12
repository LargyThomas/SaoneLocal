// orders.routes.js\n// TODO: implement orders routes logic\n\nmodule.exports = {};\n
// require
const express = require('express');
const { validationId , validationStatus} = require('./orders.validation.js');
const { newOrder, updateStatus, showOrders } = require('./orders.controller.js');
const authMiddleware = require('../../security/middleware/auth.middleware.js');
const rolesMiddleware = require('../../security/middleware/roles.middleware.js');

const router = express.Router();

// Implement order routes logic

// route for the user to do an order
router.post('/', authMiddleware, rolesMiddleware(['client']), newOrder)

// route for the producer to update the status of the order id
router.patch('/:id/status', authMiddleware, rolesMiddleware(['producteur']), validationId, validationStatus, updateStatus)

// for the producer: array of the orders done to the producer
// for the user: array of the orders done by the users
router.get('/', authMiddleware, showOrders)

// export
module.exports = router