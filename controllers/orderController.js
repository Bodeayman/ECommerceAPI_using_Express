
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');

const getOrder = async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: {

            }
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await prisma.order.findMany();
        res.status(200).json(allOrders)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const createOrder = async (req, res) => {
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






module.exports = { getOrder, getAllOrders, createOrder }
//,  deleteOrder