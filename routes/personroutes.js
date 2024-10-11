const express = require("express");
const router = express.Router();
const Person = require("./../models/person");

//post route to add a perosn
router.post('/',async(req,res)=>{
  try{
    const data=req.body
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server Error'});

  }
})

//get person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await Person.find({ work: worktype });
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

//code for update in node.js
router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData =req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
                new: true.valueOf,
                runValidators:true,
            })

        if(!response){
            return res.status(404).json({ error: "person not found" });
        }
        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal server error" });

    }
})
//message for testing only
router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response)
        {
            return res.status(404).json({error: 'Perosn not found'});
        }
        console.log("data delete");
        res.status(200).json({message: 'person deleted succesfully'});

    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });

    }
})



module.exports = router;
