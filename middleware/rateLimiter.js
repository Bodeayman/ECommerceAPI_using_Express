const rateLimit = require('express-rate-limit');

// app.use(validateTokenHandler);
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiter to all requests

module.exports = limiter