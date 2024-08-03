const express = require('express');
const Router = express.Router();
const ProductController = require('../controllers/productControllers');
const authenticate= require('../middleWares/auth')
Router.get('/products', ProductController.getAllProducts);
Router.post('/products', authenticate , ProductController.postProducts);
Router.put('/products/:id', ProductController.updateProduct);
Router.delete('/products/:id',  ProductController.deleteProduct);

module.exports = Router;
