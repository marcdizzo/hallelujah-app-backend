const express = require("express")
const router =  express.Router();
const User = require("../models/User");

// signup 
router.post('/signup', async(req,res) => {
    const {name,email,password} = req.body;
    try{
        const user = await User.create({name,email,password});
        res.json(user);
        res.redirect('/login')
    } catch(e){
        if(e.code === 11000) return res.status(400).send('Email already exits')
        res.status(400).send(e.message)
    }
})

// login
router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findByCredentials(email,password);
        res.json(user) 
    } catch(e) {
        res.status(400).send(e.message)
    }
})






module.exports = router;