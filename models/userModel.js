// const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');


// const userSchema = new mongoose.Schema({
//     name:{
//         type:String
//     },
//     email:{
//         type:String,
//         required:[true , "email is required"],

//     },
//     password:{
//         type:String,
//         required:[true , "password is required"],

//     }
// }
//  ); 
//  //hash password before saving user to database
// userSchema.pre("save" , async function(next){
//     if(!this.isModified("password")){
//         return next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password= await bcrypt.hash(this.password, salt);
//     next();
// })

// const User = mongoose.model("User", userSchema);

// module.exports = User;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
