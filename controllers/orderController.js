
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
    let { location, userId, quantity, productId } = req.body;


    try {
        const createdOrder = await prisma.order.create({
            data: {
                location: location,
                status: "Running",
                confirmedDate: new Date(),
                deliveryDate: new Date(),
                shippedDate: new Date(),
                shippingDate: new Date(),
                user: { connect: { id: parseInt(userId) } }
            },

        });
        const newOrderItem = await prisma.orderItem.create({
            data: {
                quantity: parseInt(quantity),
                product: {
                    connect: { id: parseInt(productId) }
                },
                order: {
                    connect: { id: createdOrder.id }
                }
            }
        })
        res.status(201).json({
            "message": "Created Successfully",
            "createdOrder": createdOrder,
            "newOrderItem": newOrderItem

        });
    }
    catch (err) {
        res.status(404).json({ "Error": err.message });
    }

}






module.exports = { getOrder, getAllOrders, createOrder }
//,  deleteOrder