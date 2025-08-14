const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const logToFile = require('../Utils/logging');
const { parse, formatISO } = require("date-fns");


const changeStock = async (req, res) => {
    const { stock, increase } = req.body;
    if (stock === null) {
        return res.status(400).json({ "message": "The stock is required" })
    }
    const id = parseInt(req.params.id);
    const product = await prisma.product.findFirst({ where: { id: id } })
    if (increase === null) {
        increase = "add"
    }
    if (increase === "add") {
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                quantity: product.quantity + stock
            }
        })
    }
    if (increase === "sub") {
        if (product.quantity - stock < 0) {
            return res.status(404).json({ "message": "Can't update the stock to be negative" })
        }
        await prisma.product.update({
            where: {
                id: id
            },
            data: {
                quantity: product.quantity - stock
            }
        })
    }
    const staff = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    });
    logToFile(`Stock for product with id ${product.id} has been changed by ${increase === "add" ? stock : (-1 * stock)} in date ${formatISO(new Date())} by the user ${staff.email}`);
    res.status(200).json({ "message": `Your product with id ${product.id} has been updated successfully` });
}

module.exports = { changeStock }