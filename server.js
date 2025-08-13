const express = require('express');
const dotenv = require('dotenv').config();
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./Docs/swagger-output.json"); // Auto-generated
const errorHandler = require('./Middleware/errorhandler');
const validateTokenHandler = require('./Middleware/validateTokenHandler');

const pgConnection = require('./config/pgConnection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app.use(validateTokenHandler);


app.use('/api/staffs', require("./Routes/staffRoutes"));
app.use('/api/contacts', require("./Routes/contactRoutes"));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./Routes/orderRoutes'));
app.use('/api/ratings', require('./Routes/ratingRoutes'));
app.use('/api/stocks', require('./Routes/stockRoutes'));
app.use('/api/reports', require('./Routes/reportRoutes'))
app.use('/api/sales', require('./Routes/saleRoutes'));



// app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
