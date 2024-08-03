
const express = require("express")
const Router = express.Router();
const cartController = require("../controllers/cartController")
const auth =require("../middleWares/auth")

Router.post("/addCart",auth,cartController.addCart);
Router.get("/getCart",auth,cartController.getCart);
Router.delete("/deleteCart" , auth , cartController.deleteCart);


module.exports = Router;