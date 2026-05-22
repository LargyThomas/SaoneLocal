// Controls permissions based on user roles (RBAC)

const ROLES = { client: 0, admin: 1, producteur: 2 }

// Middleware to check if the user has the required role to acces any routes
const rolesMiddleware = (requireRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Rôle manquant." })
        }
        const userRoleString = Object.keys(ROLES).find(
            key => ROLES[key] === req.user.role
        )
        if (!requireRoles.includes(userRoleString)) {
            return res.status(403).json({ message: "Accès refusé. Rôle insuffisant." })
        }
        next()
    }
}

module.exports = rolesMiddleware;