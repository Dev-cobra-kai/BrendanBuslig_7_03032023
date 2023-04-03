// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

// Importer controllers
const commentCtrl = require('../controllers/comment');

// Les routes pour les commentaires
router.post('/', commentCtrl.createComment);
router.get('/:id', commentCtrl.getOneComment);
router.get('/', commentCtrl.getAllComment);
router.delete('/:id', commentCtrl.deleteComment);
