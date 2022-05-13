
//require the models here
const User = require('../models/user');
const Restaurant = require('../models/restaurant');


module.exports = {
    index, 
    show, 
    new: newRestaurant,
    create,
    addToFavorites,
    showFavorites
};

//renders all restaurants view
function index (req, res){
    Restaurant.find({}, function(err, restaurants){ //find all restaurants
       
        res.render('restaurants/index', {title: 'View All Restaurants', restaurants}); //use dynamic titles and define them inside of their corresponding function
            
    });
};

//shows restaurant details
function show (req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){ //find a restaurant by its id
        res.render('restaurants/show', {title: 'Restaurant Details', restaurant: restaurant}); //render the details page, define the title and variables used
       
    });
};

//creates a new restaurant 
function newRestaurant(req, res){
    res.render('restaurants/new', {title: 'Add a Restaurant'}); //renders the new restaurant form
};

function create(req, res){
    const restaurant = new Restaurant(req.body); //req.body contains key-value pairs of data submitted in the request body
   //the data comes from the add a restaurant form (new.ejs)

    restaurant.save(function(err){ //save the restaurant
        // console.log(err)
        if(err) return res.render('restaurants/new');
        res.redirect(`/restaurants/${restaurant._id}`); //redirect the user to the new restaurant page (details page)
    });
};

//adds a restaurant to a favorites page
function addToFavorites(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){ //find a restaurant by its id
        //req.params is an object that contains properties mapped to the route
        User.findById(req.user._id, function(err, user){ //find a user by its id
        
            user.favorites.push(restaurant); //push into favorites 
            user.save(function(err){ //save the restaurant into the user's favorite page
        
            res.redirect(`/restaurants/${req.params.id}`); //keep user on restaurant details page
            });
        });
    });
};
//shows all of the restaurant on the favorites page
function showFavorites(req, res){
    User.findById(req.user._id, function(err, user){ //first find the user by its id 
       Restaurant.find({ //find a restaurant by its id
           '_id': {
               $in: user.favorites  //$in mongoose operator, takes an array as its value
               //populates the favorites object
           }
       }, function(err, favorites, restaurant){
           
            res.render('restaurants/favorites', {title:'My Favorites', favorites, restaurant: restaurant});
        //res.render() //ejs for listings page, pass to ejs, pass favorites //then for each loop in ejs 
       });
    });
};