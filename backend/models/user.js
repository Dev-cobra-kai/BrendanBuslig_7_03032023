// Importer mongoose (Bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB 
// et l'environnement d'exécution JavaScript Node.js)

const mongoose = require('mongoose');
// Importer mongoose-unique-validator (Utilisation unique de l'e-mail)
const uniqueValidator = require('mongoose-unique-validator');

// Pour enregistrer un nouvel utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Pour enregistrer seulement une fois la même adresse mail dans la BDD
userSchema.plugin(uniqueValidator);

// Exporter le module
module.exports = mongoose.model('User', userSchema);
