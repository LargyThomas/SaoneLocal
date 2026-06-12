const express = require('express')

const router = express.Router()
const adminController = require('./admin.controller')
const { validateProducer, validateProducerId, validateUserEmail, validateUserUpdate } = require('./admin.validation')
const authMiddleware = require('../../security/middleware/auth.middleware')
const rolesMiddleware = require('../../security/middleware/roles.middleware')

router.get('/dashboard', authMiddleware, rolesMiddleware(['admin']), adminController.getDashboard)

router.get('/producers', authMiddleware, rolesMiddleware(['admin']), adminController.getProducers)
router.post('/producers', authMiddleware, rolesMiddleware(['admin']), validateProducer, adminController.createProducer)
router.delete('/producers/:id', authMiddleware, rolesMiddleware(['admin']), validateProducerId, adminController.deleteProducer)

router.get('/users', authMiddleware, rolesMiddleware(['admin']), adminController.getUsers)
router.get('/users/:email', authMiddleware, rolesMiddleware(['admin']), validateUserEmail, adminController.getUserByEmail)
router.put('/users/:email', authMiddleware, rolesMiddleware(['admin']), validateUserEmail, validateUserUpdate, adminController.updateUser)

router.get('/logs', authMiddleware, rolesMiddleware(['admin']), adminController.getLogs)

module.exports = router