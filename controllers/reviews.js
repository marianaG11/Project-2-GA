const Restaurant = require('../models/restaurant');


module.exports = {
    create,
    delete: deleteReview,
    edit, 
    update
}

//creates a new review
function create(req, res){
    Restaurant.findById(req.params.id, function(err, restaurant){ //find restaurant by its Id
        //add the user's google account info: id, name, picture
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userPicture = req.user.picture;
        restaurant.reviews.push(req.body); //push the review data to that restaurant
        restaurant.save(function(err){  //save the review
            if (err) {
                console.log(err)
            }
            res.redirect(`/restaurants/${restaurant._id}`)
        });
    });
}

//deletes a review
function deleteReview(req, res){
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurantDoc){ //findOne is a mongosh method
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

//edits a review
function edit(req, res){
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurantDoc){
        const review = restaurantDoc.reviews.id(req.params.id); 
        res.render('reviews/edit', {title: 'Restaurant Details', review, restaurant}); //render the reviews/edit.ejs template
    });
};

//updates a review
function update(req, res){
    Restaurant.findOne({'reviews._id': req.params.id}, function(err, restaurant){
        //find the review subdoc using the id method 
        const reviewSubdoc = restaurant.reviews.id(req.params.id);
        if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`); //keeps user on restaurants details page
        //updates the text of the review
        reviewSubdoc.comment = req.body.comment;
        //then save the update
        restaurant.save(function(err){
            res.redirect(`/restaurants/${restaurant._id}`);
        });
    });
}