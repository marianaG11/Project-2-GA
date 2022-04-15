const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,  //option value in show.ejs has to match a number
        min: 1, max: 5, default: 3
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userPicture: String
}, {
    timestamps: true //reviewed on date 
});




const restaurantSchema = new Schema({
    name: {
    type: String,
    required: true
},
    foodType: String, 
    reviews: [reviewSchema],
    location: String, 
    picture: String, //add in mongoDB
    link: String //add in mongoDB
});

module.exports = mongoose.model('Restaurant', restaurantSchema);