
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const ProductService = require('../Services/productService');


const productSerivce = new ProductService();
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
    const userId = parseInt(req.params.id);
    let { location, items } = req.body;



    try {
        if (!location || !userId || !Array.isArray(items)) {
            return res.status(404).json({ "message": "Invalid or missing fields" })
        }

        const productIds = items.map(item => parseInt(item.productId, 10));

        // Fetch all requested products at once
        const existingProducts = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true }
        });

        const existingProductIds = existingProducts.map(p => p.id);
        const invalidIds = productIds.filter(id => !existingProductIds.includes(id));

        if (invalidIds.length > 0) {
            return res.status(404).json({
                message: "Some product IDs were not found",
                invalidProductIds: invalidIds
            });
        }
        const today = new Date();

        const confirmedDate = new Date(today); // today + 0
        const deliveryDate = new Date(today);
        deliveryDate.setDate(deliveryDate.getDate() + 10);

        const shippedDate = new Date(today);
        shippedDate.setDate(shippedDate.getDate() + 8);

        const shippingDate = new Date(today);
        shippingDate.setDate(shippingDate.getDate() + 7);
        const createdOrder = await prisma.order.create({
            data: {
                location: location,
                status: "Running",
                confirmedDate: confirmedDate,
                deliveryDate: deliveryDate,
                shippedDate: shippedDate,
                shippingDate: shippingDate,
                user: { connect: { id: userId } },
            },
        });

        const orderItems = await Promise.all(
            items.map((item) => {
                return prisma.orderItem.create({
                    data: {
                        quantity: parseInt(item.quantity, 10),
                        product: {
                            connect: { id: parseInt(item.productId, 10) }
                        },
                        order: {
                            connect: { id: createdOrder.id }
                        }
                    }
                });
            })
        );
        return res.status(201).json({
            "message": "Created Successfully",
            "createdOrder": createdOrder,
            "newOrderedItems": orderItems

        });
    }
    catch (err) {
        return res.status(500).json({ "Error": "Internal Server Error" });
    }

}






module.exports = { getAllUserOrders, getAllOrders, createOrder }
//,  deleteOrder