const express = require("express");
const router = express.Router();
const menuItem = require("./../models/menuItem");


//post route to add a menuItem
router.post('/',async(req,res)=>{
  try{
    const data=req.body
    const newitem = new menuItem(data);
    const response = await newitem.save();
    console.log('data saved');
    res.status(200).json(response);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server Error'});

  }
})


router.get('/', async (req,res)=>{
  try{
    const dat = await menuItem.find();
    console.log('data fetched');
    res.status(200).json(dat);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server error'});
  }
})


router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sour" || taste == "sweet" || taste == "spicy") {
      const response = await menuItem.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
