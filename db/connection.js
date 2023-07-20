const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose");


const connectionStr = "mongodb://0.0.0.0:27017/hallelujah"


mongoose.connect(connectionStr, { useNewUrlParser: true })
.then(() => console.log("Connected to mongodb"))
.catch(err => console.log(err))


mongoose.connection.on("error", (err) => {
    console.log(err);
})

