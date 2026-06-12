// Controls permissions based on user roles (RBAC)

const ROLES = { client: 1, producteur: 2, admin: 3 }

// Middleware to check if the user has the required role to acces any routes
const rolesMiddleware = (requireRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Rôle manquant." })
        }
        const roleValue = typeof req.user.role === 'string' ? parseInt(req.user.role, 10) : req.user.role
        const userRoleString = Object.keys(ROLES).find(
            key => ROLES[key] === roleValue
        )
        if (!requireRoles.includes(userRoleString)) {
            return res.status(403).json({ message: "Accès refusé. Rôle insuffisant." })
        }
        next()
    }
}

module.exports = rolesMiddleware;