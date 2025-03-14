const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token.process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error("User is not authorized");
        }
    }
});

module.exports = validateToken;