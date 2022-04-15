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

//renders all restaurants view
function index (req, res){
    Restaurant.find({}, function(err, restaurants){
       
        res.render('restaurants/index', {title: 'View All Restaurants', restaurants});
            
    });
}

//shows restaurant details
function show (req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        res.render('restaurants/show', {title: 'Restaurant Details', restaurant: restaurant});
       
    });
}

//creates a new restaurant 
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

//adds a restaurant to a favorites page
function addToFavorites(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        User.findById(req.user._id, function(err, user){
        
            user.favorites.push(restaurant); //push into favorites 
            user.save(function(err){
            console.log(user)
            res.redirect(`/restaurants/${req.params.id}`); //keep user on restaurant details page
            })
        })
    });
}
//renders the restaurant to the favorites page
function showFavorites(req, res){
    User.findById(req.user._id, function(err, user){ //first find the user by its id 
       Restaurant.find({ //find a restaurant by its id
           '_id': {
               $in: user.favorites  //$in mongoose operator, takes an array as its value
           }
       }, function(err, favorites, restaurant){
           console.log(favorites)
            res.render('restaurants/favorites', {title:'My Favorites', favorites, restaurant: restaurant})
        //    res.render() //ejs for listings page, pass to ejs, pass favorites //then for each loop in ejs 
       })
    })
}