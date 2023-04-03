const express = require('express');

const router = express.Router();
const likeCtrl = require('../controllers/like');

// Les routes pour les likes
router.get('/', likeCtrl.findAllLike);
router.post('/', likeCtrl.createLike);

module.exports = router;
