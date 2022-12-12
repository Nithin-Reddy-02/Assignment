const UserUpdate = require('../models/update.model')

var axios = require('axios');

const addToUserUpdate = (req,res) =>{
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
  
    UserUpdate.findOneAndUpdate({"email":email,"dob":dob},{"newbatch":batch},async (err,data)=>{
      if(err){
        res.status(400).json({msg:err.message})
      }
      if(data){
        res.send(data)
      }
      else{
        const newUserUpdate = new UserUpdate({
          "email" : email,
          "dob":dob,
          "newbatch":batch
        })
        await newUserUpdate.save()
        res.send("Update Successful")
      }
    })
  } catch (error) {
    
  }
}

const addUpdate = async (req,res)=>{
  try {
    var date = new Date()
    var data = JSON.stringify({
      "email": "",
      "dob": "",
      "batch": 0
    });
    

    if(date.getDate()==1){
      const updates = await UserUpdate.find({},(err,userUpdates)=>{
        if(err){
          console.log('Error updating')
          return 1
        }
        if(userUpdates.length==0){
          res.status(200).json({msg:"nothing to update"})
          return 1
        }
        userUpdates.forEach(e => {
          data = JSON.stringify({
            "email": e.email,
            "dob": new Date(e.dob),
            "batch": e.newbatch
          });
          var config = {
            method: 'post',
            url: 'http://localhost:4040/api/users/updatebatch',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(async function (response) {
            await UserUpdate.deleteOne({"email":e.email})
          })
          .catch(function (error) {
            console.log(error.message)
            throw new Error(error)
          });
        });
      })

    }
    else{
     res.status(200).json({msg:"not a start of month"})
    }
  } catch (error) {
    
  }
}

module.exports = {addUpdate,addToUserUpdate}