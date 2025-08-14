const jwt = require("jsonwebtoken");
require("dotenv").config();
const validateTokenHandler = (requiredRole) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ "message": "Make sure to put a valid token" });
            }

            const token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                req.user = decoded;

                if (requiredRole && decoded.role !== requiredRole) {
                    return res.status(403).json({ "message": "Insufficient Role" });
                }

                next();
            });
        }
        catch (err) {
            return res.status(500).json({ err: err.message })
        }

    }
};
const RefreshTokenHandler = (requiredRole) => {
    console.log("Refreshing from token handler")
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ "message": "Insert the token correctly" });
            }
            const token = authHeader.split(" ")[1];

            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                req.user = decoded;

                if (requiredRole && decoded.role !== requiredRole) {
                    return res.status(403).json({ "message": "Insufficient Role" });
                }

                next();
            });
        }
        catch (err) {
            return res.status(500).json({ err: err })
        }
    }
};
// The problem is with the two functions here i guess

module.exports = { validateTokenHandler, RefreshTokenHandler };
