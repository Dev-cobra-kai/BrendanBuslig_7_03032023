// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

// Importer controllers
const commentCtrl = require('../controllers/comment');

// Les routes pour les commentaires
router.post('/', commentCtrl.createComment); // Créer un commentaire
router.get('/:id', commentCtrl.getOneComment); // Afficher un commentaire
router.get('/', commentCtrl.getAllComment); // Afficher tous les commentaires

// Exporter le module
module.exports = router;