const jwt = require("jsonwebtoken");
require("dotenv").config();
const validateTokenHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401);
        return next(new Error("Invalid token"));
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401);
            return next(new Error("The user is not authorized"));
        }

        req.user = decoded; // هنا كان الخطأ
        next();
    });
};


module.exports = validateTokenHandler;
