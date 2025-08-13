const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');

const getAllSales = async (req, res) => {
    try {
        const allSales = await prisma.sale.findMany();
        if (allSales.length === 0) {
            return res.status(200).json({ "message": "No stocks left in this product" })
        }
        res.status(200).json(allSales);
    }
    catch (err) {
        res.status(404).json({ err: err });
    }
}

const getLowStockProducts = async (req, res) => {
    try {
        const lowStockProducts = await prisma.product.findMany({
            where: {
                quantity: {
                    lt: 5
                }
            }
        });
        res.json(lowStockProducts);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}




module.exports = { getLowStockProducts, getAllSales }