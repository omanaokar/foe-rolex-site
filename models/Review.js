const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user: String,
    title: String,
    body: String,
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review