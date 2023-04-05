// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

// Importer controllers
const likeCtrl = require('../controllers/like');

// Les routes pour les likes
router.get('/', likeCtrl.getAllLike); // Voir tous les likes
router.post('/', likeCtrl.createLike); // Créer un like

module.exports = router;
