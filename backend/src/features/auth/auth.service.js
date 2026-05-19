// Contain business logic and interaction with the database for auth

// $1, $2, etc. = parameters of SQL request.
// A bad user could put in his email : ' OR 1=1 -- and get all users --> SQL injection.
// To prevent this, we use parameterized queries, where the user input is treated as a parameter and not as part of the SQL command.

// NOW() is a SQL function that returns date and time of the current moment.

const { connexion } = require('../../database/database.js')
const { hashPassword, comparePassword } = require('../../security/crypto.js')
const { signToken } = require('../../security/jwt.js')

const register = async ({ email, password, role = 'client', gender, lastName, firstName }) => {
    const existing = await connexion.query(
        'SELECT userEmail FROM users WHERE userEmail = $1',
        [email]
    )
    if (existing.rows.length > 0) {
        throw new Error('EMAIL_EXISTE_DEJA')
    }

    const hashed = await hashPassword(password)

    const result = await connexion.query(
        `INSERT INTO users 
            (userEmail, userPassword, userRole, userGender, userLastName, userFirstName, userCreationDate, userLastConnexion)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
         RETURNING userEmail, userRole, userCreationDate`,
        [email, hashed, role, gender, lastName, firstName]
    )

    return result.rows[0]
}

const login = async ({ email, password }) => {
    const result = await connexion.query(
        'SELECT * FROM users WHERE userEmail = $1',
        [email]
    )

    if (result.rows.length === 0) {
        throw new Error('INFORMATIONS_INCORRECTES')
    }

    const user = result.rows[0]

    const isValid = await comparePassword(password, user.userpassword)
    if (!isValid) {
        throw new Error('INFORMATIONS_INCORRECTES')
    }

    await connexion.query(
        'UPDATE users SET userLastConnexion = NOW() WHERE userEmail = $1',
        [email]
    )

    const token = signToken({ email: user.useremail, role: user.userrole })

    return {
        token,
        user: {
            email: user.useremail,
            role: user.userrole,
            createdAt: user.usercreationdate,
        }
    }
}

module.exports = { register, login }