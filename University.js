const mongoose = require('mongoose');

const university = new mongoose.Schema({
    name: String,
    logo: String,
    location: String,
    gre: Number,
    greq: Number,
    grev: Number,
    ielts: Number,
    toefl: Number,
    sat: Number,
    act: Number,
    gmat: Number
});

module.exports = mongoose.model('University', university);