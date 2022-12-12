const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { Schema } = mongoose;

const UserUpdateSchema = new Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "email is requried."],
        unique: [true, "email is already taken."],
        validate: [isEmail, "invalid email"],
      },
      dob:{
        type: Date,
        required : true
      },
      newbatch:{
        type:Number,
        min:0,
        max:4,
        required:true
      }
})

const UserUpdate = mongoose.model("UserUpdate",UserUpdateSchema)

module.exports = UserUpdate