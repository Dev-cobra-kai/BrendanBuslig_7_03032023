// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// // Importer password du middleware
const password = require('../middleware/password');

// Importer controllers
const userCtrl = require('../controllers/user');
const postCtrl = require('../controllers/post');

// Les routes d'authentification
router.post('/signup', password, userCtrl.signup); // La route signup
router.post('/login', userCtrl.login); // La route login
router.get('/', auth, userCtrl.getAllUser); // Afficher tous les users
router.get('/:id', auth, userCtrl.getOneUser); // Afficher un user
router.put('/:id', auth, multer, userCtrl.modifyUser); // Modifier un user
router.delete('/:id', auth, userCtrl.deleteUser); // Supprimer un user

// La routes pour les posts
router.get('/:id/posts', postCtrl.findPostsByUserId); // Trouver tous les posts de userId

// Exporter le module
module.exports = router;
