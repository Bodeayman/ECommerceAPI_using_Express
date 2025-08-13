const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');


const changeStock = async (req, res) => {
    const { stock, increase } = req.body;
    const id = parseInt(req.params.id);
    const product = await prisma.product.findFirst({ where: { id: id } })
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
    res.status(200).json({ "message": `Your product with id ${product.id} has been updated successfully` });
}

module.exports = { changeStock }