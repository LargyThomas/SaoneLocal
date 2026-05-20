// Define routes for auth and branches the middlewares
const express = require('express');

const router = express.Router();
const authController = require('./auth.controller');
const { register, login } = authController;
const { validateRegister, validateLogin } = require('./auth.validation');

// Implement auth routes logic

router.post('/register', validateRegister, register)
router.post('/login', validateLogin, login)

module.exports = router
