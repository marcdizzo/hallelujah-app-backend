const mongoose = require("mongoose");

const DevotionSchema = mongoose.Schema({
    imgs: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: [true, "is required"]
    },
    title: {
        type: String,
        required: [true, "is required"]
    },
    description: {
        type: String,
        required: [true, "is required"]
    },
    prayer: {
        type: String,
        required: [true, "is required"]
    },
    prayerFocus: {
        type: String,
        required: [true, "is required"]
    },
    thought: {
        type: String,
        required: [true, "is required"]
    }

},{minimize: false})

const Devotion = mongoose.model('Devotion',DevotionSchema);

module.exports = Devotion;