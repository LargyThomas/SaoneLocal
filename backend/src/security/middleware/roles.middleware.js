// Controls permissions based on user roles (RBAC)

const ROLES = { client: 0, admin: 1, commercant: 2 }

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