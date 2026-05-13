// Define routes for auth and branches the middlewares
const express = require('express');

const router = express.Router();
const authController = require('./auth.controller');
const { register, login } = authController;

// Implement auth routes logic

router.post('/register', register)
router.post('/login', login)

module.exports = router
