
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');

const getAllUserOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: {
                userId:
                    parseInt(req.params.id)

            }
        })
        if (!orders) {
            res.status(404).json({ "message": "No orders found for this user" })
        }
        res.status(200).json(orders)
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






module.exports = { getAllUserOrders, getAllOrders, createOrder }
//,  deleteOrder