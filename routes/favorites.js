const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');
const isLoggedIn = require('../config/auth');


router.get('/', isLoggedIn, restaurantsCtrl.favorites);

module.exports = router;