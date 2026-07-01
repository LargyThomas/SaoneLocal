// require
const express = require('express');
const router = express.Router();

const authMiddleware = require('../../security/middleware/auth.middleware.js');
const rolesMiddleware = require('../../security/middleware/roles.middleware.js');
const {clientProfil, updateClientProfil} = require('./client.controller.js')
const {validationInformationToUpdate} = require('./client.validation.js')

// Implementation of the routes logic for the client

// return the private profil of the connected client
router.get('/profil', authMiddleware, rolesMiddleware(['client']), clientProfil)

// update private profil of the connected client
router.patch('/profil', authMiddleware, rolesMiddleware(['client']), validationInformationToUpdate, updateClientProfil)

// export
module.exports = router