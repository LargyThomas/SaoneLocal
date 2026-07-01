// require
const express = require('express');
const router = express.Router();

const { register, login } = require('./auth.controller');
const { validateRegister, validateLogin } = require('./auth.validation');

// implementation of the routes logic for the authentification

// register to a new account
router.post('/register', validateRegister, register)

// login to an existing account
router.post('/login', validateLogin, login)

// export
module.exports = router
