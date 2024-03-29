// Middleware : Exécute des fonctions lors de la requête au serveur

// Importer JsonWebToken
const jwt = require('jsonwebtoken');

// Utilisateur authentifié = routes sécurisées
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Empêche d’usurper l’identité de l’utilisateur
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        req.auth = {
            userId: userId,
            isAdmin: isAdmin
        };
        console.log(userId)
        console.log(isAdmin)
        next();
    } catch {
        res.status(401).json({
            error: "Authentification nécessaire !",
        });
    }
};

