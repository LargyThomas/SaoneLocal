// Receive requests from the routes, call service functions, and send responses back
const express = require('express');

/**
 * Registers a new user
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.register = (req, res) => {
    res.status(200).send("User registered successfully");
}

/**
 * Logs in a user
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

exports.login = (req, res) => {
    res.status(200).send("User logged in successfully");
}