const User = require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken")

const register = async(req,res)=>{
    try{
        const { name,email, password} = req.body;

        if(!name || !email || !password){
            res.status(400).send("please enter all feilds");
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).send("user already exists");
        }

        const newUser = new User({name , email , password});
        await newUser.save();
        res.status(201).json({user : newUser})
    }
    catch(err){
        res.status(400).send( "An error occured");
    }
   
};

const login = async(req, res)=>{
    
        const {email, password} = req.body;
        const user = await User.findOne({email});
        try{
            if(!user){
                res.status(400).send("user not found");
            }
            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid){
                res.status(400).send("invalid password");
            }
            const token = jwt.sign({userId : user._id} , "secret_key",{
                expiresIn: "1h"
            }
        );
        res.json({token});
        } catch(err)
     {
        console.log(err);
     }
        
    };


module.exports={register , login};