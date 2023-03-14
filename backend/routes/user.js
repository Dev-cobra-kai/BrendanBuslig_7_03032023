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

// Les routes pour l'authentification
// La route signup
router.post('/signup', password, userCtrl.signup);
// La route login
router.post('/login', userCtrl.login);
// La route logout
// router.get("/logout", auth.logout);
router.get('/', auth, userCtrl.getAllUser);
// router.get('/:id', auth, userCtrl.getOneUser);
router.post('/', auth, multer, userCtrl.createUser);
// router.put('/:id', auth, multer, userCtrl.modifyUser);
// router.delete('/:id', auth, userCtrl.deleteUser);
// router.post('/:id/like', auth, userCtrl.likeUser);

// Exporter le module
module.exports = router;
