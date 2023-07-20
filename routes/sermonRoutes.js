const express = require('express');
const router = express.Router();

const Sermon = require("../models/Sermon")
const User = require("../models/User");


router.get("/", async(req,res) => {
    try{
        const sort = {date: -1}
        const sermons = await Sermon.find().sort(sort);
        res.status(200).json(sermons)
    } catch(e) {
        res.status(400).send(e.message);
    }
})

router.get('/:id', async(req,res) => {
    const {id} = req.params;
    try{
      const sermon = await Sermon.findById(id);
      const similar = await Sermon.find({category: sermon.category}).limit(4);
      res.status(200).json({sermon, similar})
    } catch(e) {
      res.status(400).send(e.message);
    }
  })

  

  // create sermon 
router.post('/', async(req,res) => {
  const sort = {date: -1}
    try{
        const { title, preacher, date, songs: audios,  description, images: pictures } = req.body;
        const sermon = await Sermon.create({title, preacher, date, audios, description, pictures});
        const  sermons = await Sermon.find().sort(sort);
        res.status(201).json(sermons);   
    } catch(e) {
        res.status(400).send(e.message);
    }
})

// update sermon

router.patch('/:id', async(req, res)=> {
    const {id} = req.params;
    const sort = {'date': -1}
    try {
      const {title, preacher,songs : audios, description, date, images: pictures} = req.body;
      const sermon = await Sermon.findByIdAndUpdate(id, {title, preacher, date, audios, description, pictures});
      const sermons = await Sermon.find().sort(sort);
      res.status(200).json(sermons);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })

  // delete sermon
  
  router.delete('/:id', async(req, res)=> {
    const {id} = req.params;
    const {user_id} = req.body;
    try {
      const user = await User.findById(user_id);
      if(!user.isAdmin) return res.status(401).json("You don't have permission");
      await Sermon.findByIdAndDelete(id);
      const sermons = await Sermon.find();
      res.status(200).json(sermons);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })


  module.exports = router;