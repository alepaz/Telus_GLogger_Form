const mongoose = require('mongoose');
const { Schema } = mongoose; //destructing ES6

const userSchema = new Schema({
    googleID: String,
    name: String,
    credits: { type: Number, default: 0 }
});

//Create a new collection called users, this loads the schema into mongoose
mongoose.model('users', userSchema); //Mongoose doesn't overwrite collections, just add

//Everything that uses mongoose model classes, we are not going to use require statements