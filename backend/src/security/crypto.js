// Hashing and comparing the password using bcrypt

const bcrypt = require('bcrypt')

// Hash the password using bcrypt with 10 rounds of hashing
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

// Compare the plain password with the hashed password
const comparePassword = async (plain, hash) => {
    return await bcrypt.compare(plain, hash)
}

module.exports = { hashPassword, comparePassword }