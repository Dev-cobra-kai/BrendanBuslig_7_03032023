// Models : Permet de créer des schémas de données qui contiennent les champs souhaités
// pour indiquer leur type ainsi que leur caractère (obligatoire ou non)
// Pour cela, on utilise la méthode Schema mise à disposition par Mongoose

// Importer mongoose (Bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js)
const mongoose = require('mongoose');

// Importer le schéma du profil
const profilSchema = mongoose.Schema({
  userId: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  age: { type: Number, required: true },
  imageUrl: { type: String, required: true },
   // biographie: { type: String, required: true },

  // le schéma du likes et dislikes
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: Array, required: false },
  usersDisliked: { type: Array, required: false }, 
});

// Exporter le module
module.exports = mongoose.model('Profil', profilSchema);
