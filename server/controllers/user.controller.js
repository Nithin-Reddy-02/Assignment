const Batch = require("../models/batch.model");
const User = require("../models/user.model");

const addUser = async (req, res) => {
  try {
    let {name,email,dob,doj,batch} = req.body;
    if(!name){      res.status(400).json({msg:"Name is not Valid"});

    }
    if(!email){      res.status(400).json({msg:"Email is not Valid"});

    }
    if(!dob){      res.status(400).json({msg:"dob is not Valid"});

    }
    if(!doj){      res.status(400).json({msg:"doj is not Valid"});

    }
    if(!batch){      res.status(400).json({msg:"Batch is not Valid"});

    }

    dob = new Date(dob)
    doj = new Date(doj)

    if(doj<new Date()){
      res.status(400).json({msg:'Date of Joining cannot be in past'});
    }
    if(dob>new Date("2004-12-10")){
      res.status(400).json({msg:'Age below 18'});
    }

    const user = await User.findOne({email:email}).then(async (user)=>{
      if(user){
        res.status(400).json({msg:'User Already Exists'})
      }
      else{
        await Batch.updateOne({"batchNo":batch},{"$inc":{"userCount":1}})
        const newUser = new User({
          "name":name,
          "email":email,
          "dob":dob,
          "doj":doj,
          "batch":batch

        })
        await newUser.save()
        return res.status(200).json({msg:newUser})
      }
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
const getschedule = async (req,res)=>{
  try {
    let {email,dob} = req.body   
    if(!email){res.status(400).json({msg:"email is not Valid"});
    }
    if(!dob){res.status(400).json({msg:"dob is not Valid"});
    }
    let new_dob = new Date(dob)
    User.findOne({email:email}).then((user)=>{
      // console.log(new Date(user.dob)==new_dob)
      // console.log(user.dob.getTime())
      // console.log(new_dob.getTime())
      if(user.dob.getTime()==new_dob.getTime()){
        res.send(user)
      }
      else{
        res.status(400).json({msg:"Incorrect email or DOB"});
      }
    })
    
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

const updateBatch = async (req,res)=>{
  try {
    let {email,dob,batch} = req.body;
    if(!email){
      res.status(400).json({"msg":"email is not Valid"});
    }
    if(!dob){
      res.status(400).json({msg:"dob is not Valid"});
    }
    if(!batch){
      res.status(400).json({msg:"batch is not Valid"});
    }
  

   await User.findOneAndUpdate({"email":email,"dob":dob},{"batch":batch}).then(async (user)=>{
    if (user) {
      try {
        
      await Batch.findOneAndUpdate({"batchNo":batch},{"$inc":{"userCount":1}})
      await Batch.updateOne({"batchNo":user.batch},{"$inc":{"userCount":-1}})
      res.status(200).json({msg:"update successful"})
      } catch (error) {
        res.status(400).json({msg:error.message})
      }
    } else {
      return res.status(500).json({
        message: "Invalid email or dob",
      });
    }
   })
   
    

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
}

module.exports = { addUser, getschedule,updateBatch};
