// Middleware : Exécute des fonctions lors de la requête au serveur

// Importer JsonWebToken
const jwt = require('jsonwebtoken');
//Importer des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config()
if (result.error) {
    throw result.error
}
console.log(result.parsed)

// Utilisateur authentifié = routes sécurisées
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Empêche d’usurper l’identité de l’utilisateur
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch {
        res.status(401).json({
            error: "Authentification nécessaire !",
        });
    }
};
