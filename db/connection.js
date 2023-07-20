const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose");


const connectionStr = "mongodb+srv://mark:mark@cluster0.ecmc4wf.mongodb.net/hallelujah-backend"


mongoose.connect(connectionStr, { useNewUrlParser: true })
.then(() => console.log("Connected to mongodb"))
.catch(err => console.log(err))


mongoose.connection.on("error", (err) => {
    console.log(err);
})

