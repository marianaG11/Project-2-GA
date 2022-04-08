const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number, 
        min: 0, max: 5, default: 3
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userPicture: String
}, {
    timestamps: true //reviewed on date 
});




const restaurantSchema = new Schema({
title: {
    type: String,
    required: true
},
foodType: String,
reviews: [reviewSchema],
location: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);