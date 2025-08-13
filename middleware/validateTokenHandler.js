const jwt = require("jsonwebtoken");
require("dotenv").config();
const validateTokenHandler = (requiredRole) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401);
            return next(new Error("Invalid token"));
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                res.status(403).json({ "message": "Insufficient Role" });
            }

            next();
        });
    }
};


module.exports = validateTokenHandler;
