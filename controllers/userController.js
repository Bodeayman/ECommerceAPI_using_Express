const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User is already found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password " + hashedPassword);
    const createdUser = await User.create({ username, email, password: hashedPassword });
    if (createdUser) {
        res.status(200).json({ _id: createdUser.id, "email": email });

    }
    else {
        res.status(400);
        throw new Error("User data is not valid")
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ username: user.username, email: user.email, id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "15m" });
        res.status(200).json({ "token": token });
    }
    else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }

})

module.exports = { registerUser, currentUser, loginUser };