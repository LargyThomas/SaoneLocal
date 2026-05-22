// JWT token generation and verification of this token

const jwt = require('jsonwebtoken')

// Sign the playload to generate a JWT token with a JWT secret key and expiration
const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

// Verification of the JWT token using the JWT secret key
const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { signToken, verifyToken }