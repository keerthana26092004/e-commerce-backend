const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
     id:{
        type:String,
        unique:true
     },
     title:{
        type:String,
        required:[true, "title is required"]
     },
     description:{
        type:String,
        required:true
     },
     category:{
        title:String
     },
     price:{
        type:Number,
        required:true
     },
     image:{
        type:String
     },
     rating:{
        rate:{
            type:Number
        },
        count:{
            type:Number
        }
     }
});
const product = mongoose.model("products", productSchema);
module.exports=product;

