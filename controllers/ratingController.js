
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');


const getProductRating = async (req, res) => {
    try {
        const productRating = await prisma.rating.findMany({
            where: {
                productId: parseInt(req.params.id)
            },
            include: {
                user: true
            }
        });
        if (productRating.length === 0) {
            return res.status(404).json({ message: 'Rating not found for the given productId' });
        }
        return res.status(200).json(productRating);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const giveProductRating = async (req, res) => {
    const { comment, userId, rating } = req.body
    try {

        const giveRating = await prisma.rating.create({
            data: {
                comment: comment, rating: parseInt(rating),
                user: {
                    connect: { id: parseInt(userId) }
                },
                product: {
                    connect: {
                        id: parseInt(req.params.id)
                    }
                }
            }
        })
        if (!giveRating) {
            res.status(404).json("Cannot create the rating")
        }
        res.status(200).json({ message: "Rating Created Successfully", createdRating: giveRating });
    }
    catch (e) {

        res.status(500).json({ "Server message": e.message })
    }
}


module.exports = { getProductRating, giveProductRating }