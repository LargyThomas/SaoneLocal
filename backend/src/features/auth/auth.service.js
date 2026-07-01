// const
const ROLES = { client: 1, producteur: 2, admin: 3 }

// require
const { connexion } = require('../../database/database.js')
const { hashPassword, comparePassword } = require('../../security/crypto.js')
const { signToken } = require('../../security/jwt.js')

// function

/**
* @description verify if the chec2kbox is checked
* @param {string} value, 
* @return {array of hash} the basket
*/
const isCheckboxChecked = (value) => {
    return value === true || value === 'true' || value === 'on' || value === 1 || value === '1'
}

/**
* @description register a new user in the database
* @param {hash} (email, password, gender, lastname, firstname) 
* @return {hash} (usersEmail, usersRole, usersCreationDate)
*/
const registerService = async ({ email, password, gender, lastName, firstName }) => {
    const existing = await connexion.query(`
        SELECT usersEmail 
        FROM users 
        WHERE usersEmail = $1
    `,  [email])

    if (existing.rows.length > 0) {
        throw new Error('EMAIL_EXISTE_DEJA')
    }
    
    const hashed = await hashPassword(password)

    const result = await connexion.query(`
        INSERT INTO users(usersEmail, usersPassword, usersRole, usersGender, usersLastName, usersFirstName, usersCreationDate, usersLastConnexion, usersStatus)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7)
        RETURNING usersEmail, usersRole, usersCreationDate
    `,  [email, hashed, ROLES.client, gender, lastName, firstName, 'active'])

    return result.rows[0]
}

/**
* @description Login an user by checking their credentials and returning a JWT token if valid
* @param {hash} (email, password, adminCheckbox) 
* @return {hash} (token, user)
*/
const loginService = async ({ email, password, adminCheckbox }) => {
    const result = await connexion.query(`
        SELECT * 
        FROM users 
        WHERE usersEmail = $1
    `,  [email])

    if (result.rows.length === 0) {
        throw new Error('INFORMATIONS_INCORRECTES')
    }

    const user = result.rows[0]
    if (user.usersstatus !== 'active') {
        throw new Error('COMPTE_INACTIF')
    }

    const isValid = await comparePassword(password, user.userspassword)
    if (!isValid) {
        throw new Error('INFORMATIONS_INCORRECTES')
    }

    if (user.usersrole === ROLES.admin && !isCheckboxChecked(adminCheckbox)) {
        throw new Error('ADMIN_CHECKBOX_REQUIRED')
    }

    await connexion.query(`
        UPDATE users 
        SET usersLastConnexion = NOW() 
        WHERE usersEmail = $1
    `,  [email])

    const token = signToken({ email: user.usersemail, role: user.usersrole })

    return {
        token,
        user: {
            email: user.usersemail,
            role: user.usersrole,
            createdAt: user.userscreationdate,
        }
    }
}

// export
module.exports = { registerService, loginService }
