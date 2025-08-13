
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const ProductService = require('../Services/productService');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const path = require('path');


const productService = new ProductService();

const getProduct = async (req, res) => {
    const id = parseInt(req.params.id);
    const product = await productService.getSpecificProducts(id);
    return res.status(200).json({ "message": product });
}

const getAllProducts = async (req, res) => {

    try {
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    }
    catch (err) {
        return res.status(500).json({ "Error": err.message });
    }

}

const createProduct = async (req, res) => {
    let { name, price, descr, image_url, quantity } = req.body;
    price = parseInt(price);
    quantity = parseInt(quantity);

    try {
        const createdProduct = await productService.createNewProduct(name, descr, price, image_url, quantity);
        return res.status(201).json(createdProduct);
    }
    catch (err) {
        return res.status(404).json({ "Error": err.message });
    }

}

const deleteProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    try {

        const productFound = await productService.getSpecificProducts(id);
        if (!productFound) {
            return res.status(404).json({ "message": "Product is not found" });
        }
        const productDeleted = await productService.deleteSpecificProduct(id);
        return res.status(200).json({ "message": "Deleted Successfully", "Product Deleted": productDeleted });
    } catch (err) {
        return res.status(500).json({ "message": "Internal Error Device" })
    }
};

const updateProduct = async (req, res) => {
    let { id } = req.params;
    let { name, price, descr } = req.body;
    try {

        const productFound = await productService.getSpecificProducts(Number(id));
        if (!productFound) {
            return res.status(404).json({ "message": "Product is not found" });
        }
        const updatedProduct = await productService.updateSpecificProduct(Number(id), name, descr, price);
        return res.status(200).json({ "Message": "Updated the Product", "Product": updatedProduct });
    } catch (err) {
        return res.status(500).json({ "Error": "Internal Server Error" });
    }
};
const exportProductsInFile = async (req, res) => {
    console.log("hello")
    try {
        const products = await prisma.product.findMany({
            select: { id: true, name: true, price: true, quantity: true }
        });
        console.log(products);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=products.pdf');

        const doc = new PDFDocument();
        doc.pipe(res);

        // Title
        doc.fontSize(20).text('Products List', { align: 'center' });
        doc.moveDown();

        // Simple rows
        products.forEach(p => {
            doc.fontSize(12).text(
                `ID: ${p.id} | Name: ${p.name} | Price: ${p.price} | Quantity: ${p.quantity ?? ''}`
            );
        });

        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = { getProduct, getAllProducts, createProduct, deleteProduct, updateProduct, exportProductsInFile }