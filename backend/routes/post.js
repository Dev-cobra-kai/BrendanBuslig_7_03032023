// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Importer controllers/post.js
// const postCtrl = require('../controllers/post');
// const commentCtrl = require('../controllers/post');

// Les routes pour les posts
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.likePost);

// Les routes pour les commentaires
router.get('/', auth, commentCtrl.getAllProfil);
router.post('/', auth, commentCtrl.createProfil);
router.delete('/:id', auth, commentCtrl.deleteProfil);
router.post('/:id/like', auth, commentCtrl.likeComment);

// Exporter le module
module.exports = router;

