const User = require("./models/user.model");

const batches = require('./data/batches');
const Batch = require("./models/batch.model");
var axios = require('axios');
const constant = require("./config/constant");

const importData = async () => {
  try {
    await User.deleteMany();
    await Batch.deleteMany();
    
    await Batch.insertMany(batches);
    console.log("Date Imported!");
  } catch (error) {
    console.error(error);
  }
};

const updateBatches = () =>{
  var config = {
    method: 'post',
    url: `${constant.general.URL}/api/batch/update`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}


module.exports = {importData,updateBatches};
