// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Importer controllers
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');
const likeCtrl = require('../controllers/like');

// Les routes pour les posts
router.post('/', auth, multer, postCtrl.createPost); // Créer un post
router.get('/', auth, postCtrl.getAllPost); // Afficher tous les posts
router.get('/:id', auth, postCtrl.getOnePost); // Afficher un post
router.put('/:id', auth, multer, postCtrl.modifyPost); // Modifier un post
router.delete('/:id', auth, postCtrl.deletePost); // Supprimer un post

// Les routes pour les likes et les comments
router.get('/:id/comments', commentCtrl.getAllComment); // Afficher tous les commentaires
router.get('/:id/likes', likeCtrl.getAllLike); // Afficher tous les likes

// Exporter le module
module.exports = router;

