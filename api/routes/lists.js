const router = require("express").Router();
const list =require("../models/list");
const verify = require('../verifyToken');

// CREATE

router.post("/", verify, async(req,res)=>{
    if( req.user.isAdmin){
     const newList = new list(req.body);   
      
     try{
      const savedList = await newList.save();
      res.status(201).json(savedList)
     }catch(err){
        res.status(500).json(err)
     }
    }else{
        res.status(403).json("you are not allowed !")
    }
})
// DELETE

router.delete("/:id", verify, async(req,res)=>{
    if( req.user.isAdmin){
       
     try{
      await list.findByIdAndDelete(req.params.id);
      res.status(201).json("the list has been deleted!")
     }catch(err){
        res.status(500).json(err)
     }
    }else{
        res.status(403).json("you are not allowed !")
    }
})

// GET

router.get("/", verify, async (req, res)=>{
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let List = [];

    try{
        if(typeQuery){
          if(genreQuery){
            List =await list.aggregate([
            {$sample: {size:10}},
            {$match : {type: typeQuery, genre: genreQuery}}

            ])
          }else{
            List =await list.aggregate([
                {$sample: {size:10}},
                {$match : {type: typeQuery}}
            ])
          }
        }
        else{
            List =await list.aggregate([{$sample: {size:10}}])
        }
        res.status(200).json(List);

    }catch(err){
      res.status(500).json(err)
    }

    
})


module.exports = router;