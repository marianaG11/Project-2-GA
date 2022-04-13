const express = require('express');
const router = express.Router();
const restaurantsCtrl = require('../controllers/restaurants');
//require the middleware
const isLoggedIn = require('../config/auth');

router.get('/', restaurantsCtrl.index);

//new restaurant
router.get('/new', restaurantsCtrl.new);

router.get('/favorites', restaurantsCtrl.showFavorites);

router.get('/:id', restaurantsCtrl.show);


router.post('/', isLoggedIn, restaurantsCtrl.create); //isLoggedIn is a middleware function
//it calls next()

router.put('/favorites/add/:id', restaurantsCtrl.addToFavorites);


// router.get('/favorites', restaurantsCtrl.favorites);

module.exports = router;