const express = require("express");
const Router = express.Router();
const orderController= require("../controllers/orderController");
const auth = require("../middleWares/auth");

Router.post("/order" , auth ,orderController.createOrder);
Router.get("/getOrder" , auth , orderController.getOrder);

module.exports=Router;