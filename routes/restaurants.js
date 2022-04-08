const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');

const isLoggedIn = require('../config/auth');

router.get('/', restaurantsCtrl.index);

module.exports = router;