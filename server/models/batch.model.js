const mongoose = require("mongoose");

const { Schema } = mongoose;

const BatchSchema = new Schema(
  {
    batchNo:{
      type: Number,
      min:1,
      max:4,
      required:true,
    },
    userCount:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const Batch = mongoose.model("Batch", BatchSchema);

module.exports = Batch;
