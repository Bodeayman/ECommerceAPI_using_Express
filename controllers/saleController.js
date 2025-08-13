const asyncHandler = require('express-async-handler');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const { parse, formatISO } = require("date-fns");

const buyAProduct = async (req, res) => {
    const { quantity } = req.body;
    const productId = parseInt(req.params.id);


    const isoString = formatISO(new Date());
    const newSales = await prisma.sale.create(
        {

            data: {
                date: isoString,
                quantity: quantity,
                product: {
                    connect: {
                        id: productId
                    }
                }
            }
        }
    );

    const newProduct = await prisma.product.findFirst({
        where: {
            id: productId
        },
    })
    if (newProduct.quantity < quantity) {
        return res.status(400).json({ "message": "You can't update for a negative stock" })
    }
    const newUpdatedProduct = await prisma.product.update({
        where: {
            id: productId
        }
        ,
        data: {
            quantity: newProduct.quantity - quantity
        }
    })
    return res.status(200).json(newSales);
}

module.exports = { buyAProduct };