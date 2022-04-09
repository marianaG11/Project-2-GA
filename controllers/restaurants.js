const Restaurant = require('../models/restaurant');

module.exports = {
    index, 
    show
}


function index (req, res){
    Restaurant.find({}, function(err, restaurants){
        res.render('restaurants/index', {
            restaurants,
            title: 'view all restaurants'
        });
    });
}

function show (req, res){
    Restaurant.findById(req.params.id, function(err, restaurants){
        res.render('restaurants/show', restaurants);
    })
}