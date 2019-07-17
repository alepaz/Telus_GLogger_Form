const mongoose = require('mongoose');
const { Schema } = mongoose;

const counterSchema = new Schema({
    _id: String,
    sequence_value: Number
});

mongoose.model('counters', counterSchema);
