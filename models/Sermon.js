// title  preacher date picture 
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");

const SermonSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true,"is required"]
    },
    preacher: {
        type: String,
        required: [true,"is required"]
    },
    date: {
        type: String,
        required: [true,"is required"]
    },
    audios: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: [true,"is required"]
    },

    pictures: {
        type: Array,
        required: true
    },
},{minimize: false}
);

const Sermon = mongoose.model("Sermon",SermonSchema);

module.exports = Sermon;