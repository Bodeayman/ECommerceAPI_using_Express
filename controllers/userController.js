const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const User = await prisma.User.create({
            data: {
                name: username,
                email: email,
                password: password
            }
        });
        res.status(200).json({ "message": "Success", "Registered User": User });
    }
    catch (err) {
        res.status(500).json({ "Message": err.message });
    }

};

const currentUser = asyncHandler(async (req, res) => {

});

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ "Message": "All fields are mandatory" });

    }
    try {
        const user = await prisma.User.findUnique({
            where: {
                email: email,
                password: password
            }
        })
        if (!user) {
            res.status(404).json({ "Message": "Wrong username or password" });
        }
        res.status(200).json({ "Message": "Login successful" });
    }
    catch (err) {
        res.status(500).json({ "Message": err.message });
    }



}

module.exports = { registerUser, currentUser, loginUser };


// if (user && (await bcrypt.compare(password, user.password))) {
//     const token = jwt.sign({ username: user.username, email: user.email, id: user._id },
//         process.env.SECRET_KEY,
//         { expiresIn: "15m" });
//     res.status(200).json({ "token": token });
// }