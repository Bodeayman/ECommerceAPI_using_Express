const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const dotenv = require('dotenv').config();
const prisma = require('../prisma/prismaClient');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const registerStaff = async (req, res, next) => {
    const { name, email, password, address, role } = req.body;
    const roles = ["admin", "staff"];
    if (roles.indexOf(role) === -1) {
        return res.status(404).json({ "message": "Role should be Admin or Staff, Write it correctly" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
                address: address,
                role: role
            }
        });
        res.status(200).json({ "Status": `Your signed in successfully as ${role}` });
    }
    catch (err) {
        next(err);
    }

};

const currentStaff = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        }
    });
    res.status(200).json(user);
});
const updateProfile = asyncHandler(async (req, res) => {
    const { email, name, address } = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                email: email,
                name: name,
                address: address
            }
        });
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});
const loginStaff = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are mandatory" });
    }

    try {
        console.log("Attempting login for user:", email);
        console.log(password);
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Wrong email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(404).json({ message: "Wrong email or password" });
        }
        if (user.role === "admin") {
            const token = jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            console.log("ACCESS_TOKEN_SECRET:", ACCESS_TOKEN_SECRET);


            return res.status(200).json({
                status: "Success",
                role: "Admin",
                token: token
            });
        }
        else {
            const token = jwt.sign({ id: user.id, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            console.log("Access token is", token);
            return res.status(200).json({
                status: "Success",
                role: "Staff",
                token: token
            });
        }

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", err: err });
    }
};

module.exports = { registerStaff, currentStaff, loginStaff, updateProfile };


// if (user && (await bcrypt.compare(password, user.password))) {
//     const token = jwt.sign({ username: user.username, email: user.email, id: user._id },
//         process.env.SECRET_KEY,
//         { expiresIn: "15m" });
//     res.status(200).json({ "token": token });
// }