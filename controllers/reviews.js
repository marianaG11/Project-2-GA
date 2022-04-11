const Restaurant = require('../models/restaurant');


module.exports = {
    create,
    delete: deleteReview
}

function create(req, res){
    Restaurant.findById(req.params.id, function(err, restaurantFromTheDatabase){
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userPicture = req.user.picture;
        console.log(req.body, 'hello');
        restaurantFromTheDatabase.reviews.push(req.body);
        restaurantFromTheDatabase.save(function(err){
            res.redirect(`/restaurants/${restaurantFromTheDatabase._id}`)
        });
    });
};


function deleteReview(req, res){
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurantDoc){
        const review = restaurantDoc.reviews.id(req.params.id);
        if (!review.user.equals(req.user._id)) return res.redirect(`/restaurants/${restaurantDoc._id}`);

        review.remove()
        restaurantDoc.save(function(err){
            if(err) next(err);
            res.redirect(`/restaurants/${restaurantDoc._id}`);
        });
    });
};