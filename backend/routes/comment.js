// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

// Importer controllers
const commentCtrl = require('../controllers/comment');

// Les routes pour les commentaires
router.post('/', commentCtrl.createComment); // Créer un commentaire
router.get('/:id', commentCtrl.getOneComment); // Voir un commentaire
router.get('/', commentCtrl.getAllComment); // Voir tous les commentaires
router.delete('/:id', commentCtrl.deleteComment); // Supprimer un commentaire

// Exporter le module
module.exports = router;