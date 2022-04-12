// const { name } = require('ejs');
// const UserInfoError = require('passport-google-oauth20/lib/errors/userinfoerror');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');

module.exports = {
    index, 
    show, 
    new: newRestaurant,
    create,
    favorites
}


function index (req, res){
    Restaurant.find({}, function(err, restaurants){
        console.log(restaurants)
        res.render('restaurants/index', {title: 'View All Restaurants', restaurants});
            
    });
}

function show (req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        res.render('restaurants/show', {title: 'Restaurant Details', restaurant: restaurant});
        console.log(restaurant);
    });
}

function newRestaurant(req, res){
    res.render('restaurants/new', {title: 'Add a Restaurant'}); 
}

function create(req, res){
    const restaurant = new Restaurant(req.body);
    console.log(restaurant)

    restaurant.save(function(err){
        console.log(err)
        if(err) return res.render('restaurants/new');
        res.redirect(`/restaurants/${restaurant._id}`);
    });
}

function favorites(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        // console.log(req.params.id, 'restaurant id')
        // console.log(restaurant, 'restaurant object');
        console.log(req.user._id, 'user')
        User.findById(req.user._id, function(err, user){
            user.favorites.push(restaurant);
            console.log(user.favorites, 'favs');
            res.render('favorites/index', {title: 'favorites', user: user, favorites: user.favorites});
            console.log(user, 'userrrr')
        })
        // res.render('favorites/index', {title: 'favorites',restaurant: restaurant});
        console.log(err)
    });
}
