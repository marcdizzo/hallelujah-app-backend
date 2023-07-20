const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
require("./db/connection");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: "https://hallelujah-ministries-app.onrender.com",
    methods: ["POST","GET","PATCH","DELETE"]
})

const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes");
const sermonRoutes = require("./routes/sermonRoutes");
const devotionRoutes = require("./routes/devotionRoutes");
const songRoutes = require("./routes/songRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use('/users',userRoutes);
app.use('/images', imageRoutes);
app.use("/songs",songRoutes);
app.use("/sermons",sermonRoutes);
app.use("/devotions", devotionRoutes);
app.use("/blogs", blogRoutes);



server.listen(4000, () => {
    console.log("Server running at port",4000)
})

app.set("socketio", io);