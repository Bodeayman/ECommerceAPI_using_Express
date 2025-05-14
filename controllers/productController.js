
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const ProductService = require('../Services/productService');



const productService = new ProductService();

const getProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await productService.getSpecificProducts(id);
    console.log(product);
    res.status(200).json({ "message": product });
}

const getAllProducts = async (req, res) => {

    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ "Error": err.message });
    }

}

//This part is related to the admin
const createProduct = async (req, res) => {
    let { name, price, descr, image_url } = req.body;
    price = parseInt(price);

    try {
        const createdProduct = await productService.createNewProduct(name, descr, price, image_url);
        res.status(201).json(createdProduct);
    }
    catch (err) {
        res.status(404).json({ "Error": err.message });
    }

}

const deleteProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    try {

        const productDeleted = await productService.deleteSpecificProduct(id);
        res.status(200).json({ "message": "Deleted Successfully", "Product Deleted": productDeleted });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Internal Server Error" });
    }
};

const updateProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    let { name, price, descr } = req.body;
    try {

        const updatedProduct = await productService.updateSpecificProduct(id, name, descr, price);
        res.status(200).json({ "Message": "Updated the Product", "Product": updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Internal Server Error" });
    }
};


module.exports = { getProduct, getAllProducts, createProduct, deleteProduct, updateProduct }