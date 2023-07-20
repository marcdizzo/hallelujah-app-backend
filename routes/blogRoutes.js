const express = require("express")
const router = express.Router();
const Blog = require("../models/blog");
const User = require("../models/User");


router.get('/', async(req,res) => {
    try{
        const sort = {date: -1}
        const blogs = await Blog.find().sort(sort);
        res.status(200).json(blogs);
    }catch(e){
        res.status(400).send(e.message);
    }
})

router.get('/:id', async(req,res) => {
    const {id} = req.params;
    try{
      const blog = await Blog.findById(id);
      const similar = await Blog.find({category: blog.category}).limit(4);
      res.status(200).json({blog, similar})
    } catch(e) {
      res.status(400).send(e.message);
    }
  })

  // create product 
router.post('/', async(req,res) => {
    const sort = {date: -1}
    try{
        const { title, article, quote, date, pics: blogImgs } = req.body;
        const blog = await Blog.create({title, article, quote, date, blogImgs});
        const blogs = await Blog.find().sort(sort);
        res.status(201).json(blogs);   
    } catch(e) {
        res.status(400).send(e.message);
    }
})

// update product

router.patch('/:id', async(req, res)=> {
    const {id} = req.params;
    try {
      const {title, article, quote, date, pics:blogImgs } = req.body;
      const blog = await Blog.findByIdAndUpdate(id, {title, article, quote, date, blogImgs});
      const blogs = await Blog.find();
      res.status(200).json(blogs);
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
      await Blog.findByIdAndDelete(id);
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })


  module.exports = router;