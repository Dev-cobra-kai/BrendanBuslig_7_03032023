// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Importer controllers/post.js
const postCtrl = require('../controllers/post');
// const commentCtrl = require('../controllers/comment');
// const likeCtrl = require('../controllers/like');

// Les routes pour les posts
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, multer, postCtrl.deletePost);

// Les routes pour les commentaires
// router.get('/', auth, commentCtrl.getAllComment);
// router.post('/', auth, commentCtrl.createComment);
// router.put('/:id', auth, multer, postCtrl.modifyComment);
// router.delete('/:id', auth, commentCtrl.deleteComment);

// Les routes pour les likes
// router.get('/:id/like/:id', auth, likeCtrl.getLike);
// router.post('/:id/like', auth, likeCtrl.Createlike);
// router.put('/:id/like/:id', auth, likeCtrl.modifyLike);

// Exporter le module
module.exports = router;

