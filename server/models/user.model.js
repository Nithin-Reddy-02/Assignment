const mongoose = require("mongoose");
const { isEmail } = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required."],
    },
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
    doj:{
      type: Date,
      required : true
    },
    batch:{
      type: Number,
      min:1,
      max:4,
      required:true,
    },
    payment:{
      type: Number,
      default:0,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
