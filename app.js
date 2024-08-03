const express = require("express");
const productroutes= require("./routes/productRoutes");
const app=express();
const bodyParser = require('body-parser');
const userRoutes = require("./routes/userRoutes");
const cartRouter= require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");


const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://keerthana:atlas123@keerthanaravikumar188.lovbrra.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=keerthanaravikumar188").then(()=>{
    console.log("mongodb connected")
});

app.set("view engine" , "ejs");
app.use(bodyParser.json())
app.use("/" , cartRouter);
app.use("/" , productroutes);
app.use("/" , userRoutes);
app.use("/" , orderRoutes);
app.use(cors());

app.listen(3000, ()=> {
    console.log("server is running on port 3000");
});