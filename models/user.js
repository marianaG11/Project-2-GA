const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create your User Model
const userSchema = new mongoose.Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    picture: String,
    favorites: {type: [Schema.Types.ObjectId], ref: 'Restaurant' }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);