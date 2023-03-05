// Importer password-validator
const passwordValidator = require('password-validator');

// Création du schema de password-validator
const passwordSchema = new passwordValidator();

// Le schéma a respecter pour le mot de passe
passwordSchema
    .is().min(8)                                    // Minimum 8 lettres
    .is().max(100)                                  // Maximum 100 lettres
    .has().uppercase()                              // Au moins une lettre en majuscule
    .has().lowercase()                              // Au moins une lettre en minuscule
    .has().digits(2)                                // Au moins 2 chiffres
    .has().not().spaces()                           // Pas d'espaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Valeurs sur liste noire

// Valider par rapport à une chaîne de mot de passe
console.log(passwordSchema.validate('validPASS123'));
// => true
console.log(passwordSchema.validate('invalidPASS'));
// => false

// Vérifier la qualité du password par rapport au schema
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(400).json({ error: "Les conditions de sécurité pour le mot de passe ne sont pas respectées : minimum 8 caractères, une majuscule, une minuscule, 2 chiffres, aucun espace." });
    } else {
        next();
    }
}
