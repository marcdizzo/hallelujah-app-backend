const express = require("express")
const router = express.Router();
const User = require("../models/User");
const Devotion = require("../models/Devotion");


router.get('/', async(req,res) => {
    try{
        const sort = {date: -1}
        const devotions = await Devotion.find().sort(sort);
        res.status(200).json(devotions);
    } catch(e) {
        res.status(400).send(e.message);
    }
})


router.get('/:id', async(req,res) => {
    const {id} = req.params;
    try{
      const devotion = await Devotion.findById(id);
      const similar = await Devotion.find({category: devotion.category}).limit(4);
      res.status(200).json({devotion, similar})
    } catch(e) {
      res.status(400).send(e.message);
    }
  })

// create devotional
router.post('/', async(req,res) => {
    const sort = {date: -1};
    try{
        const { title, date, description, devs: imgs, thought, prayer, prayerFocus  } = req.body;
        const devotion = await Devotion.create({ title, date, description, imgs, thought, prayer,prayerFocus })
        const devotions = await Devotion.find().sort(sort)
        res.status(201).json(devotions);
    }catch(e){
        res.status(400).send(e.message);
    }
})

// update product

router.patch('/:id', async(req, res)=> {
    const {id} = req.params;
    try {
      const {title, description, date, prayer, prayerFocus, thought, devs: imgs} = req.body;
      const devotion = await Devotion.findByIdAndUpdate(id, {title, description,date, prayer, prayerFocus, thought, imgs});
      const devotions = await Devotion.find();
      res.status(200).json(devotions);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  
  
  // delete product
  
  router.delete('/:id', async(req, res)=> {
    const {id} = req.params;
    const {user_id} = req.body;
    try {
      const user = await User.findById(user_id);
      if(!user.isAdmin) return res.status(401).json("You don't have permission");
      await Devotion.findByIdAndDelete(id);
      const devotions = await Devotion.find();
      res.status(200).json(devotions);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })


  module.exports = router;