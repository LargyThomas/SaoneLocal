const express = require('express')

const router = express.Router()
const adminController = require('./admin.controller')
const { validateProducer, validateProducerId, validateUserEmail, validateUserUpdate, validateOrderId, validateOrderStatus, validateProductId, validateEventId, validateEvent } = require('./admin.validation')
const authMiddleware = require('../../security/middleware/auth.middleware')
const rolesMiddleware = require('../../security/middleware/roles.middleware')

// Dashboard
router.get('/dashboard', authMiddleware, rolesMiddleware(['admin']), adminController.getDashboard)

// Producers
router.get('/producers', authMiddleware, rolesMiddleware(['admin']), adminController.getProducers)
router.post('/producers', authMiddleware, rolesMiddleware(['admin']), validateProducer, adminController.createProducer)
router.delete('/producers/:id', authMiddleware, rolesMiddleware(['admin']), validateProducerId, adminController.deleteProducer)
router.patch('/producers/:id/enable', authMiddleware, rolesMiddleware(['admin']), validateProducerId, adminController.enableProducer)

// Users
router.get('/users', authMiddleware, rolesMiddleware(['admin']), adminController.getUsers)
router.get('/users/:email', authMiddleware, rolesMiddleware(['admin']), validateUserEmail, adminController.getUserByEmail)
router.put('/users/:email', authMiddleware, rolesMiddleware(['admin']), validateUserEmail, validateUserUpdate, adminController.updateUser)

// Orders
router.get('/orders', authMiddleware, rolesMiddleware(['admin']), adminController.getOrders)
router.get('/orders/:orderId', authMiddleware, rolesMiddleware(['admin']), validateOrderId, adminController.getOrderById)
router.patch('/orders/:orderId/status', authMiddleware, rolesMiddleware(['admin']), validateOrderId, validateOrderStatus, adminController.updateOrderStatus)
router.patch('/orders/:orderId/cancel', authMiddleware, rolesMiddleware(['admin']), validateOrderId, adminController.cancelOrder)

// Products
router.get('/products', authMiddleware, rolesMiddleware(['admin']), adminController.getProducts)
router.get('/products/:productId', authMiddleware, rolesMiddleware(['admin']), validateProductId, adminController.getProductById)
router.patch('/products/:productId/disable', authMiddleware, rolesMiddleware(['admin']), validateProductId, adminController.disableProduct)
router.patch('/products/:productId/enable', authMiddleware, rolesMiddleware(['admin']), validateProductId, adminController.enableProduct)
router.delete('/products/:productId', authMiddleware, rolesMiddleware(['admin']), validateProductId, adminController.deleteProduct)

// Events
router.get('/events', authMiddleware, rolesMiddleware(['admin']), adminController.getEvents)
router.get('/events/:eventId', authMiddleware, rolesMiddleware(['admin']), validateEventId, adminController.getEventById)
router.post('/events', authMiddleware, rolesMiddleware(['admin']), validateEvent, adminController.createEvent)
router.put('/events/:eventId', authMiddleware, rolesMiddleware(['admin']), validateEventId, validateEvent, adminController.updateEvent)
router.patch('/events/:eventId/disable', authMiddleware, rolesMiddleware(['admin']), validateEventId, adminController.disableEvent)
router.patch('/events/:eventId/enable', authMiddleware, rolesMiddleware(['admin']), validateEventId, adminController.enableEvent)
router.delete('/events/:eventId', authMiddleware, rolesMiddleware(['admin']), validateEventId, adminController.deleteEvent)

router.get('/logs', authMiddleware, rolesMiddleware(['admin']), adminController.getLogs)

module.exports = router
