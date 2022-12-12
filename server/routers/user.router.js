const express = require("express");
const { addUser, getschedule, updateBatch } = require("../controllers/user.controller");

const router = express.Router();
router.get("/",(req,res)=>{
    res.send("Status : Up and Running!");
})
router.post('/add',addUser);
router.post('/getschedule',getschedule)
router.post('/updatebatch',updateBatch)
module.exports = router;
