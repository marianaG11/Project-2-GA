const Restaurant = require('../models/restaurant');

module.exports = {
    index, 
    show, 
    new: newRestaurant,
    create
}


function index (req, res){
    Restaurant.find({}, function(err, restaurant){
        console.log(restaurant)
        res.render('restaurants/index', {title: 'View All Restaurants', restaurant});
            
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