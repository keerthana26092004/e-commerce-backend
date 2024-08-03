// const mongoose = require("mongoose");

// const cartSchema = mongoose.Schema({
// user_id:{
//     type: mongoose.Schema.Types.ObjectId,
//      ref: 'User',
//     required:true
// },
// products:{
//     product_id:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'Product',
//         required:true
//     },
//     qunatity:{
//         type:String
//     }
// }
// });

// const Cart = mongoose.model("cart" , cartSchema);
// module.exports=Cart;
const mongoose=require("mongoose");
const cartSchema=new mongoose.Schema({
    user_id:{
        type:String,
        require:true
    },
    products:[{
        productId:{
            type:String
        },
        quantity:{
            type:String
        }
        
    }]
});
const Cart= mongoose.model("Cart",cartSchema);
module.exports=Cart;