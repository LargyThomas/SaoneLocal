// Contain business logic and interaction with the database for auth

// $1, $2, etc. = parameters of SQL request.
// A bad user could put in his email : ' OR 1=1 -- and get all users --> SQL injection.
// To prevent this, we use parameterized queries, where the user input is treated as a parameter and not as part of the SQL command.

// NOW() is a SQL function that returns date and time of the current moment.

const ROLES = { client: 1, producteur: 2, admin: 3 };

const { connexion } = require('../../database/database.js')
const { hashPassword, comparePassword } = require('../../security/crypto.js')
const { signToken } = require('../../security/jwt.js')

const isCheckboxChecked = (value) => {
    return value === true || value === 'true' || value === 'on' || value === 1 || value === '1'
}

// Register a new user in the database
const register = async ({ email, password, role = 'client', gender, lastName, firstName, status = 'active' }) => {
    const roleInt = ROLES[role] ?? 1;
    const existing = await connexion.query(
        'SELECT usersEmail FROM users WHERE usersEmail = $1',
        [email]
    )
    if (existing.rows.length > 0) {
        throw new Error('EMAIL_EXISTE_DEJA')
    }
    
    const hashed = await hashPassword(password)

    const result = await connexion.query(
        `INSERT INTO users 
            (usersEmail, usersPassword, usersRole, usersGender, usersLastName, usersFirstName, usersCreationDate, usersLastConnexion, usersStatus)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), $7)
         RETURNING usersEmail, usersRole, usersCreationDate`,
        [email, hashed, roleInt, gender, lastName, firstName, status]
    )

    return result.rows[0]
}

// Login an user by checking their credentials and returning a JWT token if valid
const login = async ({ email, password, adminCheckbox }) => {
    const result = await connexion.query(
        'SELECT * FROM users WHERE usersEmail = $1',
        [email]
    )

    if (result.rows.length === 0) {
        throw new Error('INFORMATIONS_INCORRECTES')
    }

    const user = result.rows[0]

    const isValid = await comparePassword(password, user.userspassword)
    if (!isValid) {
        throw new Error('INFORMATIONS_INCORRECTES')
    }

    if (user.usersrole === ROLES.admin && !isCheckboxChecked(adminCheckbox)) {
        throw new Error('ADMIN_CHECKBOX_REQUIRED')
    }

    await connexion.query(
        'UPDATE users SET usersLastConnexion = NOW() WHERE usersEmail = $1',
        [email]
    )

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

module.exports = { register, login }