// productControllers.js
const Product = require('../models/productModel');
const { v4: uuidv4 } = require('uuid');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

const postProducts = async (req, res) => {
    try {
        const { title, description, category, price, image, rating } = req.body;
        const newProduct = new Product({ id: uuidv4(), title, description, category, price, image, rating });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).send("Server error");
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category, price, image, rating } = req.body;
        const updatedProduct = await Product.findOneAndUpdate({ id }, { title, description, category, price, image, rating }, { new: true });
        if (!updatedProduct) {
            return res.status(404).send("Product not found");
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Server error");
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findOneAndDelete({ id });
        if (!deletedProduct) {
            return res.status(404).send("Product not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Server error");
    }
};

module.exports = { getAllProducts, postProducts, updateProduct, deleteProduct };
