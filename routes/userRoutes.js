const express= require("express");
const Router = express.Router();
const UserControllers = require("../controllers/userController");

 
Router.post("/register" , UserControllers.register);
Router.post("/login" , UserControllers.login);

module.exports=Router;
