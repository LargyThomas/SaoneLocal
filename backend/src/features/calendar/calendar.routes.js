// require
const express = require('express');
const { showCalendar, producerGoToEvent, producerDoNotGoToEvent } = require('./calendar.controller.js');
const { validationEvent } = require('./calendar.validation.js');
const authMiddleware = require('../../security/middleware/auth.middleware.js');
const rolesMiddleware = require('../../security/middleware/roles.middleware.js');

const router = express.Router();

// Implement calender routes logic

// route to get the informations of the events in the calender
router.get('/', showCalendar)

// route to add the connexion of the producer connected and the given event
router.post('/', authMiddleware, rolesMiddleware(['producteur']), validationEvent, producerGoToEvent)

// route to delete the connexion of the producer connected and the given event
router.delete('/', authMiddleware, rolesMiddleware(['producteur']), validationEvent, producerDoNotGoToEvent)

// export
module.exports = router