// require
const express = require('express')
const router = express.Router()

const authMiddleware = require('../../security/middleware/auth.middleware')
const rolesMiddleware = require('../../security/middleware/roles.middleware')
const { showDashboard, showAssociation, updateAssociation, showProducer, addProducer, removeProducer, enableProducer, showUser, showUserByEmail, updateUser, showOrder, showOrderById, updateOrderStatus, cancelOrder, showProducts, showProductById, disableProduct, enableProduct, removeProduct, showEvent, showEventById, addEvent, updateEvent, disableEvent, enableEvent, removeEvent, showLogs } = require('./admin.controller')
const { validateProducer, validateProducerId, validateUserEmail, validateUserUpdate, validateOrderId, validateOrderStatus, validateProductId, validateEventId, validateEvent, validationInformationToUpdate } = require('./admin.validation')

// implementation of the routes logic for the admin

// Dashboard

// return the Dashboard
router.get('/dashboard', authMiddleware, rolesMiddleware(['admin']), showDashboard)

// association

// return the information of the association
router.get('/association', authMiddleware, rolesMiddleware(['admin']), showAssociation)

// update the information of the association
router.put('/association', authMiddleware, rolesMiddleware(['admin']), validationInformationToUpdate, updateAssociation)

// Producers

// return the information of all the producers
router.get('/producers', authMiddleware, rolesMiddleware(['admin']), showProducer)

// create a new producer
router.post('/producers', authMiddleware, rolesMiddleware(['admin']), validateProducer, addProducer)

// delete a producer
router.delete('/producers/:id', authMiddleware, rolesMiddleware(['admin']), validateProducerId, removeProducer)

// enable a producer
router.patch('/producers/:id/enable', authMiddleware, rolesMiddleware(['admin']), validateProducerId, enableProducer)

// Users

// return the information of all the users
router.get('/users', authMiddleware, rolesMiddleware(['admin']), showUser)

// return the information of the user email 
router.get('/users/:email', authMiddleware, rolesMiddleware(['admin']), validateUserEmail, showUserByEmail)

// update the information of the user email
router.put('/users/:email', authMiddleware, rolesMiddleware(['admin']), validateUserEmail, validateUserUpdate, updateUser)

// Orders

// return the information of all the orders
router.get('/orders', authMiddleware, rolesMiddleware(['admin']), showOrder)

// return the information of the order id 
router.get('/orders/:orderId', authMiddleware, rolesMiddleware(['admin']), validateOrderId, showOrderById)

// update the status of a order
router.patch('/orders/:orderId/status', authMiddleware, rolesMiddleware(['admin']), validateOrderId, validateOrderStatus, updateOrderStatus)

// update the status of a order to cancel
router.patch('/orders/:orderId/cancel', authMiddleware, rolesMiddleware(['admin']), validateOrderId, cancelOrder)

// Products

// return the information of all the product
router.get('/products', authMiddleware, rolesMiddleware(['admin']), showProducts)

// return the information of the product id 
router.get('/products/:productId', authMiddleware, rolesMiddleware(['admin']), validateProductId, showProductById)

// update the status of a product to disable
router.patch('/products/:productId/disable', authMiddleware, rolesMiddleware(['admin']), validateProductId, disableProduct)

// update the status of a product to enable
router.patch('/products/:productId/enable', authMiddleware, rolesMiddleware(['admin']), validateProductId, enableProduct)

// delete the product id
router.delete('/products/:productId', authMiddleware, rolesMiddleware(['admin']), validateProductId, removeProduct)

// Events

// return the information of all the event
router.get('/events', authMiddleware, rolesMiddleware(['admin']), showEvent)

// return the information of the event id 
router.get('/events/:eventId', authMiddleware, rolesMiddleware(['admin']), validateEventId, showEventById)

// create a new event
router.post('/events', authMiddleware, rolesMiddleware(['admin']), validateEvent, addEvent)

// update the information of the event id
router.put('/events/:eventId', authMiddleware, rolesMiddleware(['admin']), validateEventId, validateEvent, updateEvent)

// update the status of the event id disable
router.patch('/events/:eventId/disable', authMiddleware, rolesMiddleware(['admin']), validateEventId, disableEvent)

// update the information of the event id enable
router.patch('/events/:eventId/enable', authMiddleware, rolesMiddleware(['admin']), validateEventId, enableEvent)

// delete the event id
router.delete('/events/:eventId', authMiddleware, rolesMiddleware(['admin']), validateEventId, removeEvent)

// return the information of the logs
router.get('/logs', authMiddleware, rolesMiddleware(['admin']), showLogs)

// export
module.exports = router
