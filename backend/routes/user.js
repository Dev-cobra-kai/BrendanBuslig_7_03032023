// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Importer password du middleware
const password = require('../middleware/password');

// Importer controllers/user.js
const userCtrl = require('../controllers/user');
// Importer controllers/user.js
const profilCtrl = require('../controllers/user');

// Les routes pour l'authentification
// La route signup
router.post('/signup', password, userCtrl.signup);
// La route login
router.post('/login', userCtrl.login);
// La route logout
// router.get("/logout", auth.logout);

// Les routes pour le profil
router.get('/', auth, profilCtrl.getAllProfil);
router.get('/:id', auth, profilCtrl.getOneProfil);
router.post('/', auth, multer, profilCtrl.createProfil);
router.put('/:id', auth, multer, profilCtrl.modifyProfil);
router.delete('/:id', auth, profilCtrl.deleteProfil);
router.post('/:id/like', auth, profilCtrl.likeProfil);

// Exporter le module
module.exports = router;
