// Importer Express
const express = require('express');
// Fonction Router()
const router = express.Router();

// Importer password du middleware
const password = require('../middleware/password');

// Importer controllers/user.js
const userCtrl = require('../controllers/user');

// La route signup
router.post('/signup', password, userCtrl.signup);
// La route login
router.post('/login', userCtrl.login);

// Exporter le module
module.exports = router;
