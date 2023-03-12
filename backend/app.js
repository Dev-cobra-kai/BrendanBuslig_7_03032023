// Le fichier app. js contient le code JavaScript permettant de démarrer un serveur et de répondre aux requêtes

// Importer Express (un framework pour construire des applications web basées sur Node.js)
const express = require('express');

// Importer body-parser (Ce module permet d'interpréter, d'où le nom “parser”, le corps JSON d'une réponse HTTP)
const bodyParser = require('body-parser');

// Importer mongoose connexion base de donnée MySql
const mysql = require("./db/db.mysql");

// Importer la route de user
const userRoutes = require('./routes/user');
// Importer la route de post
// const postRoutes = require('./routes/post');

// Importer les chemins de fichiers et de répertoires
const path = require('path');

// Importer helmet (Permet de sécuriser vos applications Express en définissant divers en-têtes http)
const helmet = require('helmet');

// Créer une application Express
const app = express();

//Importer des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log(result.parsed)

// Ajouter helmet pour protéger les routes
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Gérer les problèmes de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Transformer le body en JSON avec bodu-parser
app.use(bodyParser.json());

// Transformer le body en JSON avec express
// app.use(express.json());

// La route de l'authentification
app.use('/api/auth', userRoutes);
// La route du post
// app.use('/api/post', postRoutes);
// Acceder aux images du dossier images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exporter app.js pour pouvoir y accèder depuis un autre fichier
module.exports = app;
