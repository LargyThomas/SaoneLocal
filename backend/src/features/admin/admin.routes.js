const express = require('express')

const router = express.Router()
const adminController = require('./admin.controller')
const { validateProducer } = require('./admin.validation')
const authMiddleware = require('../../security/middleware/auth.middleware')
const rolesMiddleware = require('../../security/middleware/roles.middleware')

router.post('/producers', authMiddleware, rolesMiddleware(['admin']), validateProducer, adminController.createProducer)
router.delete('/producers/:id', authMiddleware, rolesMiddleware(['admin']), adminController.deleteProducer)
router.put('/producers/:id', authMiddleware, rolesMiddleware(['admin']), validateProducer, adminController.updateProducer)

router.delete('/products/:id', authMiddleware, rolesMiddleware(['admin']), adminController.deleteProduct)
router.put('/products/:id', authMiddleware, rolesMiddleware(['admin']), validateProduct, adminController.updateProduct)

router.delete('/users/:id', authMiddleware, rolesMiddleware(['admin']), adminController.deleteUser)
router.put('/users/:id', authMiddleware, rolesMiddleware(['admin']), validateUser, adminController.updateUser)

module.exports = router