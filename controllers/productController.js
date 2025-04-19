
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');


const getProduct = async (req, res) => {

    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(req.params.id),
        }

    });
    console.log(product);
    res.status(200).json({ "message": product });
}

const getAllProducts = async (req, res) => {

    try {
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ "Error": err.message });
    }

}

//This part is related to the admin
const createProduct = async (req, res) => {
    let { name, price, descr } = req.body;
    price = parseInt(price);

    try {
        const createdProduct = await prisma.product.create({
            data: {
                name: name,
                descr: descr,
                price: price,
            }
        });
        res.status(201).json(createdProduct);
    }
    catch (err) {
        res.status(404).json({ "Error": err.message });
    }

}

const deleteProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    try {

        const deletedProduct = await prisma.product.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({ "message": "Deleted Successfully", "Product Deleted": deletedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Internal Server Error" });
    }
};

const updateProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    let { name, price, descr } = req.body;
    try {

        const updatedProduct = await prisma.product.update({
            where: {
                id: id,
            }
            , data: {
                price: price,
                descr: descr,
                name: name
            }
        });
        res.status(200).json({ "Message": "Updated the Product", "Product": updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "Error": "Internal Server Error" });
    }
};


module.exports = { getProduct, getAllProducts, createProduct, deleteProduct, updateProduct }