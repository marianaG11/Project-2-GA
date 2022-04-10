const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');

const isLoggedIn = require('../config/auth');

router.get('/', restaurantsCtrl.index);

//new restaurant
router.get('/new', restaurantsCtrl.new);

router.get('/:id', restaurantsCtrl.show);
module.exports = router;

router.post('/', restaurantsCtrl.create);