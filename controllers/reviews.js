const Restaurant = require('../models/restaurant');


module.exports = {
    create,
    delete: deleteReview,
    edit, 
    update
}

function create(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userPicture = req.user.picture;
        console.log(req.body, 'hello');
        restaurant.reviews.push(req.body);
        restaurant.save(function(err){
            console.log(err)
            res.redirect(`/restaurants/${restaurant._id}`)
        });
    });
}


function deleteReview(req, res){
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurantDoc){
        const review = restaurantDoc.reviews.id(req.params.id);
        
        //this makes sure that the review is made by the specific user that is logged in
        if (!review.user.equals(req.user._id)) return res.redirect(`/restaurants/${restaurantDoc._id}`);

        review.remove()
        restaurantDoc.save(function(err){
            if(err) next(err);
            res.redirect(`/restaurants/${restaurantDoc._id}`); //redirects user to the restaurant details page
        });
    });
};

function edit(req, res){
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurantDoc){
        const review = restaurantDoc.reviews.id(req.params.id); 
        res.render('reviews/edit', {title: 'Restaurant Details', review, restaurant}); //render the reviews/edit.ejs template
    });
};

function update(req, res){
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurant){
        //find the review subdoc using the id method 
        const reviewSubdoc = restaurant.reviews.id(req.params.id);
        if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`);
        //updates the text of the review
        reviewSubdoc.comment = req.body.comment;
        //then save the update
        restaurant.save(function(err){
            res.redirect(`/restaurants/${restaurant._id}`);
        });
    });
}