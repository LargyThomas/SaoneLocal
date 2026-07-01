// require
const express = require('express');
const router = express.Router();

const authMiddleware = require('../../security/middleware/auth.middleware.js');
const rolesMiddleware = require('../../security/middleware/roles.middleware.js');
const { validationId , validationStatus } = require('./orders.validation.js');
const { newOrder, updateStatus, showOrders } = require('./orders.controller.js');

// Implementation of the routes logic for the order

// route for the user to do an order
router.post('/', authMiddleware, rolesMiddleware(['client']), newOrder)

// route for the producer to update the status of the order id
router.patch('/:id/status', authMiddleware, rolesMiddleware(['producteur']), validationId, validationStatus, updateStatus)

// for the producer: array of the orders done to the producer
// for the user: array of the orders done by the users
router.get('/', authMiddleware, showOrders)

// export
module.exports = router