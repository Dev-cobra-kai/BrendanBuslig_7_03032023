// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// // Importer password du middleware
const password = require('../middleware/password');

// Importer controllers/user.js
const userCtrl = require('../controllers/user');

// Les routes d'authentification
router.post('/auth/signup', password, userCtrl.signup); // La route signup
router.post('/auth/login', userCtrl.login); // La route login
// router.get("/logout", auth.logout); // La route logout
router.get('/', auth, userCtrl.getAllUser); // Voir tous les users
router.get('/:id', auth, userCtrl.getOneUser); // Voir un user
router.put('/:id', auth, multer, userCtrl.modifyUser); // Modifier un user
router.delete('/:id', auth, userCtrl.deleteUser); // Supprimer un user

// Exporter le module
module.exports = router;
