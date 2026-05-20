// Controls permissions based on user roles (RBAC)

const rolesMiddleware = (requireRoles) => {
    return(req, res, next) => {
        if (!req.user){
            return res.status(401).json({ message: "Rôle manquant." });
        }
        if (!requireRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accés refusé. Rôle insuffisant." });
        }
        next();
    }
}

module.exports = rolesMiddleware;