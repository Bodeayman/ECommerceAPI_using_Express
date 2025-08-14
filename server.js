const express = require('express');
const dotenv = require('dotenv').config();
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./Docs/swagger-output.json"); // Auto-generated
const errorHandler = require('./Middleware/errorhandler');
const validateTokenHandler = require('./Middleware/validateTokenHandler');
const limiter = require('./Middleware/rateLimiter');
const pgConnection = require('./config/pgConnection');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(limiter);

app.use('/api/staffs', require("./Routes/staffRoutes"));
app.use('/api/contacts', require("./Routes/contactRoutes"));
app.use('/api/products', require('./Routes/productRoutes'));
app.use('/api/orders', require('./Routes/orderRoutes'));
app.use('/api/ratings', require('./Routes/ratingRoutes'));
app.use('/api/stocks', require('./Routes/stockRoutes'));
app.use('/api/reports', require('./Routes/reportRoutes'))
app.use('/api/sales', require('./Routes/saleRoutes'));

// app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});
