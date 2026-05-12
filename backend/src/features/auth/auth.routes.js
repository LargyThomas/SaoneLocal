const express = require('express');

const router = express.Router();
const authController = require('./auth.controller');
const { register, login } = authController;

// TODO: implement auth routes logic

router.post('/register', register)
router.post('/login', login)

module.exports = router
