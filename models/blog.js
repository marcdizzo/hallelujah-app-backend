const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "is required"]
    },
    blogImgs: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: [true, "is required"]
    },
    article: {
        type: String,
        required: [true, "is required"]
    },
    quote: {
        type: String,
        required: [true, "is required"]
    },

},{minimize: false})

const Blog = mongoose.model('Blog',BlogSchema);

module.exports = Blog;

