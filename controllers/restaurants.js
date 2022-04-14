const User = require('../models/user');
const Restaurant = require('../models/restaurant');


module.exports = {
    index, 
    show, 
    new: newRestaurant,
    create,
    addToFavorites,
    showFavorites
}


function index (req, res){
    Restaurant.find({}, function(err, restaurants){
       
        res.render('restaurants/index', {title: 'View All Restaurants', restaurants});
            
    });
}

function show (req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        res.render('restaurants/show', {title: 'Restaurant Details', restaurant: restaurant});
       
    });
}

function newRestaurant(req, res){
    res.render('restaurants/new', {title: 'Add a Restaurant'}); 
}

function create(req, res){
    const restaurant = new Restaurant(req.body);
   

    restaurant.save(function(err){
        console.log(err)
        if(err) return res.render('restaurants/new');
        res.redirect(`/restaurants/${restaurant._id}`);
    });
}


function addToFavorites(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        User.findById(req.user._id, function(err, user){
        
            user.favorites.push(restaurant);
            user.save(function(err){
            console.log(user)
            res.redirect(`/restaurants/${req.params.id}`);
            })
        })
    });
}

function showFavorites(req, res){
    User.findById(req.user._id, function(err, user){
       Restaurant.find({
           '_id': {
               $in: user.favorites
           }
       }, function(err, favorites, restaurant){
           console.log(favorites)
            res.render('restaurants/favorites', {title:'My Favorites', favorites, restaurant: restaurant})
        //    res.render() //ejs for listings page, pass to ejs, pass favorites //then for each loop in ejs 
       })
    })
}